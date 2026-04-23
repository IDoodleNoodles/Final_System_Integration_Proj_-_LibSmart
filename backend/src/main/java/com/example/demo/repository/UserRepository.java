package com.example.demo.repository;

import com.example.demo.model.User;
import com.example.demo.repository.projection.LoginUserProjection;
import com.example.demo.repository.projection.ProfileUserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

/**
 * Composable repository for User entity.
 * Implements soft-delete filtering to exclude logically deleted users.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByUsername(String username);

    /**
     * Find non-deleted user by username with only password and ID (optimized for login).
     * Excludes soft-deleted users from authentication.
     */
    @Query("""
        select u.id as id, u.username as username, u.password as password 
        from User u 
        where u.username = :username 
        and u.deletedAt is null
        """)
    Optional<LoginUserProjection> findLoginUserByUsername(@Param("username") String username);

    /**
     * Find non-deleted user profile by ID.
     * Excludes soft-deleted users from profile operations.
     */
    @Query("""
        select u.id as id,
           u.username as username,
           u.email as email,
           u.fullName as fullName,
           u.phone as phone,
           u.address as address,
           u.createdAt as createdAt,
           u.photoFileName as photoFileName
        from User u
        where u.id = :id
        and u.deletedAt is null
        """)
    Optional<ProfileUserProjection> findProfileUserById(@Param("id") Long id);

    /**
     * Update profile fields for non-deleted users only.
     */
    @Modifying
    @Transactional
    @Query("""
        update User u
           set u.username = :username,
           u.email = :email,
           u.fullName = :fullName,
           u.phone = :phone,
           u.address = :address,
           u.updatedAt = CURRENT_TIMESTAMP
         where u.id = :id
         and u.deletedAt is null
        """)
    int updateProfileFields(
        @Param("id") Long id,
        @Param("username") String username,
        @Param("email") String email,
        @Param("fullName") String fullName,
        @Param("phone") String phone,
        @Param("address") String address);
    
    Optional<User> findByEmail(String email);
    
    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);
}
