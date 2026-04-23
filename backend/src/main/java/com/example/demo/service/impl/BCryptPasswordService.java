package com.example.demo.service.impl;

import com.example.demo.service.PasswordService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * BCrypt-based implementation of PasswordService.
 * Provides secure password encoding and verification using Spring Security.
 * Composable and testable component.
 */
@Service
public class BCryptPasswordService implements PasswordService {

    private final PasswordEncoder passwordEncoder;

    public BCryptPasswordService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String encodePassword(String rawPassword) {
        if (rawPassword == null || rawPassword.isBlank()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        return passwordEncoder.encode(rawPassword);
    }

    @Override
    public boolean matchesPassword(String rawPassword, String encodedPassword) {
        if (rawPassword == null || encodedPassword == null) {
            return false;
        }
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
