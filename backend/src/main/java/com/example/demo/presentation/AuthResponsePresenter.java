package com.example.demo.presentation;

import com.example.demo.model.LoginResponse;
import com.example.demo.model.ProfileResponse;
import com.example.demo.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class AuthResponsePresenter {

    public ResponseEntity<String> message(HttpStatus status, String message) {
        return ResponseEntity.status(status).body(message);
    }

    public ResponseEntity<LoginResponse> loginMessage(HttpStatus status, String message, String token) {
        return ResponseEntity.status(status).body(new LoginResponse(message, token));
    }

    public ResponseEntity<LoginResponse> loginBadRequest(String message) {
        return loginMessage(HttpStatus.BAD_REQUEST, message, null);
    }

    public ResponseEntity<LoginResponse> loginUnauthorized(String message) {
        return loginMessage(HttpStatus.UNAUTHORIZED, message, null);
    }

    public ResponseEntity<LoginResponse> loginSuccess(String token) {
        return loginMessage(HttpStatus.OK, "Login successful", token);
    }

    public ResponseEntity<LoginResponse> loginServiceUnavailable() {
        return loginMessage(HttpStatus.SERVICE_UNAVAILABLE, "Authentication service temporarily unavailable", null);
    }

    public ResponseEntity<ProfileResponse> profileSuccess(User user) {
        return ResponseEntity.ok(ProfileResponse.fromUser(user));
    }
}
