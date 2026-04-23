package com.example.demo.service.impl;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.PasswordService;
import com.example.demo.service.UserManagementService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Implementation of UserManagementService.
 * Handles user lifecycle with password security and audit tracking.
 * Composable service that integrates with PasswordService for security.
 */
@Service
@Transactional
public class UserManagementServiceImpl implements UserManagementService {

    private final UserRepository userRepository;
    private final PasswordService passwordService;

    public UserManagementServiceImpl(UserRepository userRepository, PasswordService passwordService) {
        this.userRepository = userRepository;
        this.passwordService = passwordService;
    }

    @Override
    public User registerUser(String username, String email, String password) {
        validateInput(username, "Username");
        validateInput(email, "Email");
        validateInput(password, "Password");

        if (usernameExists(username)) {
            throw new IllegalArgumentException("Username already exists: " + username);
        }

        if (emailExists(email)) {
            throw new IllegalArgumentException("Email already exists: " + email);
        }

        String encodedPassword = passwordService.encodePassword(password);
        User user = new User(username, email, encodedPassword);
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        if (username == null || username.isBlank()) {
            return Optional.empty();
        }
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        if (email == null || email.isBlank()) {
            return Optional.empty();
        }
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findById(Long id) {
        if (id == null || id <= 0) {
            return Optional.empty();
        }
        return userRepository.findById(id);
    }

    @Override
    public boolean usernameExists(String username) {
        if (username == null || username.isBlank()) {
            return false;
        }
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean emailExists(String email) {
        if (email == null || email.isBlank()) {
            return false;
        }
        return userRepository.existsByEmail(email);
    }

    @Override
    public User updateProfile(Long userId, String email, String fullName, String phone, String address) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        // Check email uniqueness if it's being changed
        if (email != null && !email.isBlank() && !email.equals(user.getEmail())) {
            if (emailExists(email)) {
                throw new IllegalArgumentException("Email already exists: " + email);
            }
            user.setEmail(email);
        }

        if (fullName != null && !fullName.isBlank()) {
            user.setFullName(fullName);
        }

        if (phone != null && !phone.isBlank()) {
            user.setPhone(phone);
        }

        if (address != null && !address.isBlank()) {
            user.setAddress(address);
        }

        user.markUpdated();
        return userRepository.save(user);
    }

    @Override
    public boolean changePassword(Long userId, String currentPassword, String newPassword) {
        validateInput(userId.toString(), "User ID");
        validateInput(currentPassword, "Current password");
        validateInput(newPassword, "New password");

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        // Verify current password
        if (!passwordService.matchesPassword(currentPassword, user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        String encodedNewPassword = passwordService.encodePassword(newPassword);
        user.setPassword(encodedNewPassword);
        user.markUpdated();
        userRepository.save(user);
        return true;
    }

    @Override
    public boolean softDeleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        user.softDelete();
        user.markUpdated();
        userRepository.save(user);
        return true;
    }

    @Override
    public boolean restoreUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        user.restore();
        user.markUpdated();
        userRepository.save(user);
        return true;
    }

    private void validateInput(String input, String fieldName) {
        if (input == null || input.isBlank()) {
            throw new IllegalArgumentException(fieldName + " cannot be null or empty");
        }
    }
}
