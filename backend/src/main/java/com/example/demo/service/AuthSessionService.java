package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Legacy session service for backward compatibility.
 * NEW CODE SHOULD USE SessionManagementService interface instead.
 * This service delegates to SessionManagementService for database persistence.
 *
 * @deprecated Use SessionManagementService directly for new implementations.
 */
@Service
@Deprecated(since = "1.1", forRemoval = true)
public class AuthSessionService {

    @Autowired
    private SessionManagementService sessionManagementService;

    /**
     * Create a new session for a user.
     * Delegates to SessionManagementService for database persistence.
     *
     * @param userId the user ID
     * @return the generated token
     */
    public String createSession(Long userId) {
        return sessionManagementService.createSession(userId).getToken();
    }

    /**
     * Get the user ID from a valid token.
     * Delegates to SessionManagementService with database validation.
     *
     * @param token the session token
     * @return Optional containing the user ID if token is valid
     */
    public Optional<Long> getUserId(String token) {
        return sessionManagementService.getUserIdFromToken(token);
    }
}

