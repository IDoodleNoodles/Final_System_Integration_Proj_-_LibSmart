package com.example.demo.service;

import com.example.demo.model.User;
import java.util.Optional;

/**
 * Composable interface for user lifecycle management.
 * Handles registration, profile management, and user data operations.
 */
public interface UserManagementService {

    /**
     * Register a new user with username, email, and password.
     * Passwords are automatically encoded.
     *
     * @param username the unique username
     * @param email    the unique email address
     * @param password the raw password (will be encoded)
     * @return the created user
     * @throws IllegalArgumentException if user already exists or validation fails
     */
    User registerUser(String username, String email, String password);

    /**
     * Find a user by username.
     *
     * @param username the username
     * @return Optional containing the user if found
     */
    Optional<User> findByUsername(String username);

    /**
     * Find a user by email.
     *
     * @param email the email address
     * @return Optional containing the user if found
     */
    Optional<User> findByEmail(String email);

    /**
     * Find a user by ID.
     *
     * @param id the user ID
     * @return Optional containing the user if found
     */
    Optional<User> findById(Long id);

    /**
     * Check if username is already taken.
     *
     * @param username the username to check
     * @return true if username exists
     */
    boolean usernameExists(String username);

    /**
     * Check if email is already taken.
     *
     * @param email the email to check
     * @return true if email exists
     */
    boolean emailExists(String email);

    /**
     * Update user profile information.
     * Excludes password updates (use changePassword instead).
     *
     * @param userId    the user ID
     * @param email     new email (or null to keep)
     * @param fullName  new full name (or null to keep)
     * @param phone     new phone (or null to keep)
     * @param address   new address (or null to keep)
     * @return updated user
     * @throws IllegalArgumentException if user not found or data is invalid
     */
    User updateProfile(Long userId, String email, String fullName, String phone, String address);

    /**
     * Change a user's password.
     *
     * @param userId           the user ID
     * @param currentPassword  the current password (for verification)
     * @param newPassword      the new password
     * @return true if password was changed successfully
     * @throws IllegalArgumentException if current password is incorrect
     */
    boolean changePassword(Long userId, String currentPassword, String newPassword);

    /**
     * Soft delete a user (mark as deleted without removing data).
     *
     * @param userId the user ID
     * @return true if deletion was successful
     */
    boolean softDeleteUser(Long userId);

    /**
     * Restore a soft-deleted user.
     *
     * @param userId the user ID
     * @return true if restoration was successful
     */
    boolean restoreUser(Long userId);
}
