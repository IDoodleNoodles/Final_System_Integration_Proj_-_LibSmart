package com.example.demo.service;

import com.example.demo.model.Session;
import java.util.Optional;
import java.util.List;

/**
 * Composable interface for session lifecycle management.
 * Enables token creation, validation, revocation, and cleanup.
 */
public interface SessionManagementService {

    /**
     * Create a new session for a user with token-based authentication.
     *
     * @param userId the user ID
     * @return the created session with generated token
     */
    Session createSession(Long userId);

    /**
     * Retrieve a valid session by token.
     * Returns empty if token is expired or revoked.
     *
     * @param token the session token
     * @return Optional containing the session if valid
     */
    Optional<Session> getValidSession(String token);

    /**
     * Get the user ID associated with a valid token.
     *
     * @param token the session token
     * @return Optional containing the user ID if token is valid
     */
    Optional<Long> getUserIdFromToken(String token);

    /**
     * Revoke a specific session by token.
     *
     * @param token the session token to revoke
     * @return true if revocation was successful
     */
    boolean revokeSession(String token);

    /**
     * Revoke all sessions for a user (logout from all devices).
     *
     * @param userId the user ID
     * @return number of sessions revoked
     */
    int revokeAllUserSessions(Long userId);

    /**
     * Get all active sessions for a user.
     *
     * @param userId the user ID
     * @return list of active sessions
     */
    List<Session> getActiveSessionsForUser(Long userId);

    /**
     * Update session's last accessed time (for activity tracking).
     *
     * @param token the session token
     */
    void updateSessionActivity(String token);

    /**
     * Clean up expired sessions from the database.
     *
     * @return number of sessions deleted
     */
    int cleanupExpiredSessions();
}
