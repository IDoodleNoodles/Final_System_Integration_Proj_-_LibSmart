package com.example.demo.service;

import com.example.demo.model.Session;
import com.example.demo.model.User;
import com.example.demo.repository.SessionRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class SessionService {

    private static final int SESSION_DURATION_HOURS = 24;

    private final SessionRepository sessionRepository;
    private final UserRepository userRepository;

    public SessionService(SessionRepository sessionRepository, UserRepository userRepository) {
        this.sessionRepository = sessionRepository;
        this.userRepository = userRepository;
    }

    public Session createSession(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        String token = UUID.randomUUID().toString();
        LocalDateTime expiresAt = LocalDateTime.now().plusHours(SESSION_DURATION_HOURS);

        Session session = new Session(user, token, expiresAt);
        return sessionRepository.save(session);
    }

    public Optional<Session> getValidSession(String token) {
        if (token == null || token.isBlank()) {
            return Optional.empty();
        }
        return sessionRepository.findValidSessionByToken(token);
    }

    /**
     * Uses a direct JPQL query to fetch userId without triggering lazy-load on Session.user.
     * This was the root cause of the LazyInitializationException -> 503 error.
     */
    public Optional<Long> getUserIdFromToken(String token) {
        if (token == null || token.isBlank()) {
            return Optional.empty();
        }
        return sessionRepository.findUserIdByValidToken(token);
    }

    public boolean revokeSession(String token) {
        if (token == null || token.isBlank()) {
            return false;
        }
        return sessionRepository.revokeSessionByToken(token) > 0;
    }

    public int revokeAllUserSessions(Long userId) {
        return sessionRepository.revokeAllUserSessions(userId);
    }

    public List<Session> getActiveSessionsForUser(Long userId) {
        return sessionRepository.findActiveSessionsByUserId(userId);
    }

    public void updateSessionActivity(String token) {
        if (token != null && !token.isBlank()) {
            sessionRepository.updateLastAccessedTime(token);
        }
    }

    public int cleanupExpiredSessions() {
        return sessionRepository.deleteExpiredSessions();
    }
}
