package com.example.demo.controller;

import com.example.demo.model.ChangePasswordRequest;
import com.example.demo.model.LoginRequest;
import com.example.demo.model.LoginResponse;
import com.example.demo.model.ProfileResponse;
import com.example.demo.model.RegisterRequest;
import com.example.demo.model.UpdateProfileRequest;
import com.example.demo.model.User;
import com.example.demo.service.AuthenticationService;
import com.example.demo.service.SessionManagementService;
import com.example.demo.service.UserManagementService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

/**
 * REST controller for authentication and user profile management.
 * Demonstrates composable ServiceLayer architecture with clear separation of concerns:
 * - AuthenticationService: login/logout workflows
 * - UserManagementService: user CRUD and password management
 * - SessionManagementService: token lifecycle management
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthenticationService authenticationService;
    private final UserManagementService userManagementService;
    private final SessionManagementService sessionManagementService;

    public AuthController(
            AuthenticationService authenticationService,
            UserManagementService userManagementService,
            SessionManagementService sessionManagementService) {
        this.authenticationService = authenticationService;
        this.userManagementService = userManagementService;
        this.sessionManagementService = sessionManagementService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        try {
            if (isBlank(request.getUsername()) || isBlank(request.getPassword()) || isBlank(request.getEmail())) {
                return ResponseEntity.badRequest().body("Username, email, and password are required");
            }

            userManagementService.registerUser(request.getUsername(), request.getEmail(), request.getPassword());
            return ResponseEntity.status(HttpStatus.CREATED).body("Registration successful");

        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        if (isBlank(request.getUsername()) || isBlank(request.getPassword())) {
            return ResponseEntity.badRequest().body(new LoginResponse("Username and password are required", null));
        }

        try {
            Optional<String> tokenOptional = authenticationService.authenticate(request.getUsername(), request.getPassword());
            if (tokenOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new LoginResponse("Invalid username or password", null));
            }

            return ResponseEntity.ok(new LoginResponse("Login successful", tokenOptional.get()));

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(new LoginResponse("Authentication service temporarily unavailable", null));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader(value = "X-Auth-Token", required = false) String token) {
        if (isBlank(token)) {
            return ResponseEntity.badRequest().body("Token is required");
        }

        boolean revoked = authenticationService.logout(token);
        if (revoked) {
            return ResponseEntity.ok("Logged out successfully");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }

    @PostMapping("/logout-all-devices")
    public ResponseEntity<String> logoutAllDevices(@RequestHeader(value = "X-Auth-Token", required = false) String token) {
        Optional<Long> userIdOptional = authenticationService.getUserIdFromToken(token);
        if (userIdOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing token");
        }

        authenticationService.logoutAllDevices(userIdOptional.get());
        return ResponseEntity.ok("Logged out from all devices");
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader(value = "X-Auth-Token", required = false) String token) {
        Optional<Long> userIdOptional = authenticationService.getUserIdFromToken(token);
        if (userIdOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing token");
        }

        Optional<User> userOptional = userManagementService.findById(userIdOptional.get());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        User user = userOptional.get();
        if (user.isDeleted()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User account has been deleted");
        }

        sessionManagementService.updateSessionActivity(token);

        ProfileResponse response = new ProfileResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setFullName(user.getFullName());
        response.setPhone(user.getPhone());
        response.setAddress(user.getAddress());
        response.setCreatedAt(user.getCreatedAt());
        if (!isBlank(user.getPhotoFileName())) {
            response.setPhotoReference("/api/profile/photo");
        }

        return ResponseEntity.ok(response);
    }

    @PutMapping("/profile")
    public ResponseEntity<String> updateProfile(
            @RequestHeader(value = "X-Auth-Token", required = false) String token,
            @RequestBody UpdateProfileRequest request) {
        Optional<Long> userIdOptional = authenticationService.getUserIdFromToken(token);
        if (userIdOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing token");
        }

        try {
            userManagementService.updateProfile(
                    userIdOptional.get(),
                    request.getEmail(),
                    request.getFullName(),
                    request.getPhone(),
                    request.getAddress()
            );

            sessionManagementService.updateSessionActivity(token);
            return ResponseEntity.ok("Profile updated successfully");

        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
        }
    }

    @PutMapping("/profile/password")
    public ResponseEntity<String> changePassword(
            @RequestHeader(value = "X-Auth-Token", required = false) String token,
            @RequestBody ChangePasswordRequest request) {
        Optional<Long> userIdOptional = authenticationService.getUserIdFromToken(token);
        if (userIdOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing token");
        }

        if (isBlank(request.getCurrentPassword()) || isBlank(request.getNewPassword())) {
            return ResponseEntity.badRequest().body("Current password and new password are required");
        }

        try {
            userManagementService.changePassword(
                    userIdOptional.get(),
                    request.getCurrentPassword(),
                    request.getNewPassword()
            );

            sessionManagementService.updateSessionActivity(token);
            return ResponseEntity.ok("Password updated successfully");

        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }
    }

    @PostMapping("/profile/photo")
    public ResponseEntity<String> uploadPhoto(
            @RequestHeader(value = "X-Auth-Token", required = false) String token,
            @RequestParam("file") MultipartFile file) throws IOException {
        Optional<Long> userIdOptional = authenticationService.getUserIdFromToken(token);
        if (userIdOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing token");
        }

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is required");
        }

        String contentType = file.getContentType();
        String fileName = file.getOriginalFilename();
        if (!isSupportedImage(contentType, fileName)) {
            return ResponseEntity.badRequest().body("Only .jpg, .jpeg, and .png files are allowed");
        }

        Optional<User> userOptional = userManagementService.findById(userIdOptional.get());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        User user = userOptional.get();
        user.setPhotoData(file.getBytes());
        user.setPhotoContentType(contentType);
        user.setPhotoFileName(fileName);
        user.markUpdated();

        // Save updated user
        userManagementService.updateProfile(user.getId(), null, null, null, null);
        sessionManagementService.updateSessionActivity(token);

        return ResponseEntity.ok("Photo uploaded successfully. Reference: /api/profile/photo");
    }

    @GetMapping("/profile/photo")
    public ResponseEntity<?> getPhoto(@RequestHeader(value = "X-Auth-Token", required = false) String token) {
        Optional<Long> userIdOptional = authenticationService.getUserIdFromToken(token);
        if (userIdOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing token");
        }

        Optional<User> userOptional = userManagementService.findById(userIdOptional.get());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        User user = userOptional.get();
        if (user.getPhotoData() == null || user.getPhotoData().length == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No photo found");
        }

        String contentType = user.getPhotoContentType();
        if (isBlank(contentType)) {
            contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
        }

        sessionManagementService.updateSessionActivity(token);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + safeFileName(user.getPhotoFileName()) + "\"")
                .contentType(MediaType.parseMediaType(contentType))
                .body(user.getPhotoData());
    }

    private boolean isSupportedImage(String contentType, String fileName) {
        if ("image/jpeg".equalsIgnoreCase(contentType) || "image/png".equalsIgnoreCase(contentType)) {
            return true;
        }

        if (isBlank(fileName)) {
            return false;
        }

        String lower = fileName.toLowerCase();
        return lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".png");
    }

    private String safeFileName(String fileName) {
        if (isBlank(fileName)) {
            return "photo";
        }
        return fileName.replace('"', '_');
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}

