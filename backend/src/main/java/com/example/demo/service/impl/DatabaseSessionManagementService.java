package com.example.demo.service.impl;

import com.example.demo.model.Session;
import com.example.demo.model.User;
import com.example.demo.repository.SessionRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.SessionManagementService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Database-backed implementation of SessionManagementService.
 * Provides persistent session storage with token expiration and revocation.
 * Composable service that integrates with JPA repositories.
 */
@Service
@Transactional
public class DatabaseSessionManagementService implements SessionManagementService {

    private final SessionRepository sessionRepository;
    private final UserRepository userRepository;
    private static final int SESSION_DURATION_HOURS = 24;

    public DatabaseSessionManagementService(SessionRepository sessionRepository, UserRepository userRepository) {
        this.sessionRepository = sessionRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Session createSession(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        String token = UUID.randomUUID().toString();
        LocalDateTime expiresAt = LocalDateTime.now().plusHours(SESSION_DURATION_HOURS);

        Session session = new Session(user, token, expiresAt);
        return sessionRepository.save(session);
    }

    @Override
    public Optional<Session> getValidSession(String token) {
        if (token == null || token.isBlank()) {
            return Optional.empty();
        }
        return sessionRepository.findValidSessionByToken(token);
    }

    @Override
    public Optional<Long> getUserIdFromToken(String token) {
        return getValidSession(token)
                .map(session -> session.getUser().getId());
    }

    @Override
    public boolean revokeSession(String token) {
        if (token == null || token.isBlank()) {
            return false;
        }
        int rowsUpdated = sessionRepository.revokeSessionByToken(token);
        return rowsUpdated > 0;
    }

    @Override
    public int revokeAllUserSessions(Long userId) {
        return sessionRepository.revokeAllUserSessions(userId);
    }

    @Override
    public List<Session> getActiveSessionsForUser(Long userId) {
        return sessionRepository.findActiveSessionsByUserId(userId);
    }

    @Override
    public void updateSessionActivity(String token) {
        if (token != null && !token.isBlank()) {
            sessionRepository.updateLastAccessedTime(token);
        }
    }

    @Override
    public int cleanupExpiredSessions() {
        return sessionRepository.deleteExpiredSessions();
    }
}
