package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordService passwordService;

    public UserService(UserRepository userRepository, PasswordService passwordService) {
        this.userRepository = userRepository;
        this.passwordService = passwordService;
    }

    public User registerUser(String username, String email, String password) {
        requireNonBlank(username, "Username");
        requireNonBlank(email, "Email");
        requireNonBlank(password, "Password");

        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username already exists: " + username);
        }
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists: " + email);
        }

        return userRepository.save(new User(username, email, passwordService.encodePassword(password)));
    }

    public Optional<User> findByUsername(String username) {
        if (username == null || username.isBlank()) return Optional.empty();
        return userRepository.findByUsername(username);
    }

    public Optional<User> findByEmail(String email) {
        if (email == null || email.isBlank()) return Optional.empty();
        return userRepository.findByEmail(email);
    }

    public Optional<User> findById(Long id) {
        if (id == null || id <= 0) return Optional.empty();
        return userRepository.findById(id);
    }

    public boolean usernameExists(String username) {
        if (username == null || username.isBlank()) return false;
        return userRepository.existsByUsername(username);
    }

    public boolean emailExists(String email) {
        if (email == null || email.isBlank()) return false;
        return userRepository.existsByEmail(email);
    }

    public User updateProfile(Long userId, String email, String fullName, String phone, String address) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        if (email != null && !email.isBlank() && !email.equals(user.getEmail())) {
            if (emailExists(email)) {
                throw new IllegalArgumentException("Email already exists: " + email);
            }
            user.setEmail(email);
        }
        if (fullName != null && !fullName.isBlank()) user.setFullName(fullName);
        if (phone != null && !phone.isBlank()) user.setPhone(phone);
        if (address != null && !address.isBlank()) user.setAddress(address);

        user.markUpdated();
        return userRepository.save(user);
    }

    public boolean changePassword(Long userId, String currentPassword, String newPassword) {
        requireNonBlank(currentPassword, "Current password");
        requireNonBlank(newPassword, "New password");

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        if (!passwordService.matchesPassword(currentPassword, user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        user.setPassword(passwordService.encodePassword(newPassword));
        user.markUpdated();
        userRepository.save(user);
        return true;
    }

    public boolean softDeleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));
        user.softDelete();
        user.markUpdated();
        userRepository.save(user);
        return true;
    }

    public boolean restoreUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));
        user.restore();
        user.markUpdated();
        userRepository.save(user);
        return true;
    }

    private void requireNonBlank(String value, String fieldName) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(fieldName + " cannot be null or empty");
        }
    }
}
