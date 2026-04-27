package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.presentation.AuthResponsePresenter;
import com.example.demo.service.AuthService;
import com.example.demo.service.SessionService;
import com.example.demo.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;
    private final UserService userService;
    private final SessionService sessionService;
    private final AuthResponsePresenter presenter;

    public AuthController(AuthService authService,
                          UserService userService,
                          SessionService sessionService,
                          AuthResponsePresenter presenter) {
        this.authService = authService;
        this.userService = userService;
        this.sessionService = sessionService;
        this.presenter = presenter;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        if (isBlank(request.getUsername()) || isBlank(request.getPassword()) || isBlank(request.getEmail())) {
            return presenter.message(HttpStatus.BAD_REQUEST, "Username, email, and password are required");
        }
        try {
            userService.registerUser(request.getUsername(), request.getEmail(), request.getPassword());
            return presenter.message(HttpStatus.CREATED, "Registration successful");
        } catch (IllegalArgumentException ex) {
            return presenter.message(HttpStatus.CONFLICT, ex.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        if (isBlank(request.getUsername()) || isBlank(request.getPassword())) {
            return presenter.loginBadRequest("Username and password are required");
        }
        try {
            Optional<String> token = authService.authenticate(request.getUsername(), request.getPassword());
            if (token.isEmpty()) {
                return presenter.loginUnauthorized("Invalid username or password");
            }
            return presenter.loginSuccess(token.get());
        } catch (Exception ex) {
            LOGGER.error("Login failed for user '{}': {}", request.getUsername(), ex.getMessage(), ex);
            return presenter.loginServiceUnavailable();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader(value = "X-Auth-Token", required = false) String token) {
        if (isBlank(token)) {
            return ResponseEntity.badRequest().body("Token is required");
        }
        boolean revoked = authService.logout(token);
        return revoked
                ? ResponseEntity.ok("Logged out successfully")
                : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
    }

    @PostMapping("/logout-all-devices")
    public ResponseEntity<String> logoutAllDevices(@RequestHeader(value = "X-Auth-Token", required = false) String token) {
        Optional<Long> userId = authService.getUserIdFromToken(token);
        if (userId.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing token");
        }
        authService.logoutAllDevices(userId.get());
        return ResponseEntity.ok("Logged out from all devices");
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader(value = "X-Auth-Token", required = false) String token) {
        Optional<Long> userId = authService.getUserIdFromToken(token);
        if (userId.isEmpty()) {
            return presenter.message(HttpStatus.UNAUTHORIZED, "Invalid or missing token");
        }
        Optional<User> user = userService.findById(userId.get());
        if (user.isEmpty() || user.get().isDeleted()) {
            return presenter.message(HttpStatus.UNAUTHORIZED, "User not found or deleted");
        }
        sessionService.updateSessionActivity(token);
        return presenter.profileSuccess(user.get());
    }

    @PutMapping("/profile")
    public ResponseEntity<String> updateProfile(
            @RequestHeader(value = "X-Auth-Token", required = false) String token,
            @RequestBody UpdateProfileRequest request) {
        Optional<Long> userId = authService.getUserIdFromToken(token);
        if (userId.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing token");
        }
        try {
            userService.updateProfile(userId.get(), request.getEmail(), request.getFullName(), request.getPhone(), request.getAddress());
            sessionService.updateSessionActivity(token);
            return ResponseEntity.ok("Profile updated successfully");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
        }
    }

    @PutMapping("/profile/password")
    public ResponseEntity<String> changePassword(
            @RequestHeader(value = "X-Auth-Token", required = false) String token,
            @RequestBody ChangePasswordRequest request) {
        Optional<Long> userId = authService.getUserIdFromToken(token);
        if (userId.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing token");
        }
        if (isBlank(request.getCurrentPassword()) || isBlank(request.getNewPassword())) {
            return ResponseEntity.badRequest().body("Current password and new password are required");
        }
        try {
            userService.changePassword(userId.get(), request.getCurrentPassword(), request.getNewPassword());
            sessionService.updateSessionActivity(token);
            return ResponseEntity.ok("Password updated successfully");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }
    }

    @PostMapping("/profile/photo")
    public ResponseEntity<String> uploadPhoto(
            @RequestHeader(value = "X-Auth-Token", required = false) String token,
            @RequestParam("file") MultipartFile file) throws IOException {
        Optional<Long> userId = authService.getUserIdFromToken(token);
        if (userId.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing token");
        }
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is required");
        }
        if (!isSupportedImage(file.getContentType(), file.getOriginalFilename())) {
            return ResponseEntity.badRequest().body("Only .jpg, .jpeg, and .png files are allowed");
        }
        Optional<User> userOptional = userService.findById(userId.get());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
        User user = userOptional.get();
        user.setPhotoData(file.getBytes());
        user.setPhotoContentType(file.getContentType());
        user.setPhotoFileName(file.getOriginalFilename());
        user.markUpdated();
        userService.updateProfile(user.getId(), null, null, null, null);
        sessionService.updateSessionActivity(token);
        return ResponseEntity.ok("Photo uploaded successfully. Reference: /api/profile/photo");
    }

    @GetMapping("/profile/photo")
    public ResponseEntity<?> getPhoto(@RequestHeader(value = "X-Auth-Token", required = false) String token) {
        Optional<Long> userId = authService.getUserIdFromToken(token);
        if (userId.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing token");
        }
        Optional<User> userOptional = userService.findById(userId.get());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
        User user = userOptional.get();
        if (user.getPhotoData() == null || user.getPhotoData().length == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No photo found");
        }
        String contentType = isBlank(user.getPhotoContentType())
                ? MediaType.APPLICATION_OCTET_STREAM_VALUE
                : user.getPhotoContentType();
        sessionService.updateSessionActivity(token);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + safeFileName(user.getPhotoFileName()) + "\"")
                .contentType(MediaType.parseMediaType(contentType))
                .body(user.getPhotoData());
    }

    private boolean isSupportedImage(String contentType, String fileName) {
        if ("image/jpeg".equalsIgnoreCase(contentType) || "image/png".equalsIgnoreCase(contentType)) return true;
        if (isBlank(fileName)) return false;
        String lower = fileName.toLowerCase();
        return lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".png");
    }

    private String safeFileName(String fileName) {
        return isBlank(fileName) ? "photo" : fileName.replace('"', '_');
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
