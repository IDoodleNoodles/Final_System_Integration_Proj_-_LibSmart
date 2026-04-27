package com.example.demo.repository;

import com.example.demo.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {

    @Query("""
        SELECT s FROM Session s
        WHERE s.token = :token
        AND s.isRevoked = false
        AND s.expiresAt > CURRENT_TIMESTAMP
        """)
    Optional<Session> findValidSessionByToken(@Param("token") String token);

    /**
     * Directly fetch userId from a valid session — avoids lazy-loading Session.user.
     * This fixes the LazyInitializationException that caused the 503 error.
     */
    @Query("""
        SELECT s.user.id FROM Session s
        WHERE s.token = :token
        AND s.isRevoked = false
        AND s.expiresAt > CURRENT_TIMESTAMP
        """)
    Optional<Long> findUserIdByValidToken(@Param("token") String token);

    Optional<Session> findByToken(String token);

    @Query("""
        SELECT s FROM Session s
        WHERE s.user.id = :userId
        AND s.isRevoked = false
        AND s.expiresAt > CURRENT_TIMESTAMP
        """)
    List<Session> findActiveSessionsByUserId(@Param("userId") Long userId);

    @Modifying
    @Transactional
    @Query("UPDATE Session s SET s.isRevoked = true WHERE s.token = :token")
    int revokeSessionByToken(@Param("token") String token);

    @Modifying
    @Transactional
    @Query("UPDATE Session s SET s.isRevoked = true WHERE s.user.id = :userId")
    int revokeAllUserSessions(@Param("userId") Long userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Session s WHERE s.expiresAt <= CURRENT_TIMESTAMP")
    int deleteExpiredSessions();

    @Modifying
    @Transactional
    @Query("UPDATE Session s SET s.lastAccessedAt = CURRENT_TIMESTAMP WHERE s.token = :token")
    int updateLastAccessedTime(@Param("token") String token);

    @Query("""
        SELECT COUNT(s) FROM Session s
        WHERE s.user.id = :userId
        AND s.isRevoked = false
        AND s.expiresAt > CURRENT_TIMESTAMP
        """)
    long countActiveSessionsByUserId(@Param("userId") Long userId);
}
