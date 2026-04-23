package com.example.demo.repository;

import com.example.demo.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

/**
 * Repository for composite session management with database persistence.
 * Enables token validation, expiration, and session lifecycle operations.
 */
@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {

    /**
     * Find a valid session by token.
     * Composable method for authentication checks.
     */
    @Query("""
        SELECT s FROM Session s 
        WHERE s.token = :token 
        AND s.isRevoked = false 
        AND s.expiresAt > CURRENT_TIMESTAMP
        """)
    Optional<Session> findValidSessionByToken(@Param("token") String token);

    /**
     * Find session by token without validation filters.
     */
    Optional<Session> findByToken(String token);

    /**
     * Find all active sessions for a user.
     */
    @Query("""
        SELECT s FROM Session s 
        WHERE s.user.id = :userId 
        AND s.isRevoked = false 
        AND s.expiresAt > CURRENT_TIMESTAMP
        """)
    List<Session> findActiveSessionsByUserId(@Param("userId") Long userId);

    /**
     * Revoke a session by token.
     */
    @Modifying
    @Transactional
    @Query("UPDATE Session s SET s.isRevoked = true WHERE s.token = :token")
    int revokeSessionByToken(@Param("token") String token);

    /**
     * Revoke all sessions for a user (useful for logout-all-devices).
     */
    @Modifying
    @Transactional
    @Query("UPDATE Session s SET s.isRevoked = true WHERE s.user.id = :userId")
    int revokeAllUserSessions(@Param("userId") Long userId);

    /**
     * Delete expired sessions (cleanup task).
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM Session s WHERE s.expiresAt <= CURRENT_TIMESTAMP")
    int deleteExpiredSessions();

    /**
     * Update last accessed timestamp for session activity tracking.
     */
    @Modifying
    @Transactional
    @Query("UPDATE Session s SET s.lastAccessedAt = CURRENT_TIMESTAMP WHERE s.token = :token")
    int updateLastAccessedTime(@Param("token") String token);

    /**
     * Count active sessions for a user.
     */
    @Query("""
        SELECT COUNT(s) FROM Session s 
        WHERE s.user.id = :userId 
        AND s.isRevoked = false 
        AND s.expiresAt > CURRENT_TIMESTAMP
        """)
    long countActiveSessionsByUserId(@Param("userId") Long userId);
}
