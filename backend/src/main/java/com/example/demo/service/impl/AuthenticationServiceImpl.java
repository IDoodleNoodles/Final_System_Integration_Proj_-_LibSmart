package com.example.demo.service.impl;

import com.example.demo.model.Session;
import com.example.demo.model.User;
import com.example.demo.service.AuthenticationService;
import com.example.demo.service.PasswordService;
import com.example.demo.service.SessionManagementService;
import com.example.demo.service.UserManagementService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Implementation of AuthenticationService.
 * Composes UserManagementService, SessionManagementService, and PasswordService
 * for complete authentication workflows.
 * Enables composable authentication logic without tight coupling.
 */
@Service
@Transactional
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserManagementService userManagementService;
    private final SessionManagementService sessionManagementService;
    private final PasswordService passwordService;

    public AuthenticationServiceImpl(
            UserManagementService userManagementService,
            SessionManagementService sessionManagementService,
            PasswordService passwordService) {
        this.userManagementService = userManagementService;
        this.sessionManagementService = sessionManagementService;
        this.passwordService = passwordService;
    }

    @Override
    public Optional<String> authenticate(String username, String password) {
        if (username == null || username.isBlank() || password == null || password.isBlank()) {
            return Optional.empty();
        }

        Optional<User> userOptional = userManagementService.findByUsername(username);
        if (userOptional.isEmpty()) {
            return Optional.empty();
        }

        User user = userOptional.get();

        // Don't allow login for deleted users
        if (user.isDeleted()) {
            return Optional.empty();
        }

        // Verify password
        if (!passwordService.matchesPassword(password, user.getPassword())) {
            return Optional.empty();
        }

        // Create session
        Session session = sessionManagementService.createSession(user.getId());
        return Optional.of(session.getToken());
    }

    @Override
    public boolean isTokenValid(String token) {
        if (token == null || token.isBlank()) {
            return false;
        }
        return sessionManagementService.getValidSession(token).isPresent();
    }

    @Override
    public Optional<Long> getUserIdFromToken(String token) {
        if (token == null || token.isBlank()) {
            return Optional.empty();
        }
        return sessionManagementService.getUserIdFromToken(token);
    }

    @Override
    public boolean logout(String token) {
        return sessionManagementService.revokeSession(token);
    }

    @Override
    public int logoutAllDevices(Long userId) {
        if (userId == null || userId <= 0) {
            return 0;
        }
        return sessionManagementService.revokeAllUserSessions(userId);
    }
}
