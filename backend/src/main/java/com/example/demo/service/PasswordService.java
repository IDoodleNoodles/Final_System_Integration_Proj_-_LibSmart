package com.example.demo.service;

/**
 * Composable interface for password encoding and verification.
 * Abstracts password security concerns for pluggable implementations.
 */
public interface PasswordService {

    /**
     * Encode a raw password using a secure hashing algorithm.
     *
     * @param rawPassword the plain text password
     * @return the encoded/hashed password
     */
    String encodePassword(String rawPassword);

    /**
     * Verify a raw password against an encoded password.
     *
     * @param rawPassword     the plain text password to verify
     * @param encodedPassword the previously encoded password
     * @return true if passwords match, false otherwise
     */
    boolean matchesPassword(String rawPassword, String encodedPassword);
}
