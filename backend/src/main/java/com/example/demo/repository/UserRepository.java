package com.example.demo.repository;

import com.example.demo.model.User;
import com.example.demo.repository.projection.LoginUserProjection;
import com.example.demo.repository.projection.ProfileUserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    @Query("""
        SELECT u.id AS id, u.username AS username, u.password AS password
        FROM User u
        WHERE u.username = :username AND u.deletedAt IS NULL
        """)
    Optional<LoginUserProjection> findLoginUserByUsername(@Param("username") String username);

    @Query("""
        SELECT u.id AS id, u.username AS username, u.email AS email,
               u.fullName AS fullName, u.phone AS phone, u.address AS address,
               u.createdAt AS createdAt, u.photoFileName AS photoFileName
        FROM User u
        WHERE u.id = :id AND u.deletedAt IS NULL
        """)
    Optional<ProfileUserProjection> findProfileUserById(@Param("id") Long id);
}
