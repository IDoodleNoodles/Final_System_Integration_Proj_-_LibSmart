package com.example.demo.service;

import com.example.demo.model.Session;
import com.example.demo.model.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AuthService {

    private final UserService userService;
    private final SessionService sessionService;
    private final PasswordService passwordService;

    public AuthService(UserService userService, SessionService sessionService, PasswordService passwordService) {
        this.userService = userService;
        this.sessionService = sessionService;
        this.passwordService = passwordService;
    }

    public Optional<String> authenticate(String username, String password) {
        if (username == null || username.isBlank() || password == null || password.isBlank()) {
            return Optional.empty();
        }

        Optional<User> userOptional = userService.findByUsername(username);
        if (userOptional.isEmpty()) {
            return Optional.empty();
        }

        User user = userOptional.get();

        if (user.isDeleted()) {
            return Optional.empty();
        }

        if (!passwordService.matchesPassword(password, user.getPassword())) {
            return Optional.empty();
        }

        Session session = sessionService.createSession(user.getId());
        return Optional.of(session.getToken());
    }

    public boolean isTokenValid(String token) {
        if (token == null || token.isBlank()) return false;
        return sessionService.getValidSession(token).isPresent();
    }

    public Optional<Long> getUserIdFromToken(String token) {
        if (token == null || token.isBlank()) return Optional.empty();
        return sessionService.getUserIdFromToken(token);
    }

    public boolean logout(String token) {
        return sessionService.revokeSession(token);
    }

    public int logoutAllDevices(Long userId) {
        if (userId == null || userId <= 0) return 0;
        return sessionService.revokeAllUserSessions(userId);
    }
}
