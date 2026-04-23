package com.example.demo.service;

import java.util.Optional;

/**
 * Composable interface for authentication operations.
 * Handles login, logout, and token validation workflows.
 */
public interface AuthenticationService {

    /**
     * Authenticate a user and create a session token.
     *
     * @param username the username
     * @param password the password
     * @return Optional containing the authentication token if credentials are valid
     */
    Optional<String> authenticate(String username, String password);

    /**
     * Verify that a token represents a valid, non-expired session.
     *
     * @param token the token to verify
     * @return true if token is valid
     */
    boolean isTokenValid(String token);

    /**
     * Get the user ID from a valid token.
     *
     * @param token the token
     * @return Optional containing the user ID if token is valid
     */
    Optional<Long> getUserIdFromToken(String token);

    /**
     * Logout a user by revoking their session token.
     *
     * @param token the session token
     * @return true if logout was successful
     */
    boolean logout(String token);

    /**
     * Logout a user from all devices by revoking all their sessions.
     *
     * @param userId the user ID
     * @return number of sessions revoked
     */
    int logoutAllDevices(Long userId);
}
