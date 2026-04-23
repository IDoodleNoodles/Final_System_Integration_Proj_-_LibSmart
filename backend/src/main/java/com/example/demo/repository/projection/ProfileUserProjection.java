package com.example.demo.repository.projection;

import java.time.LocalDateTime;

public interface ProfileUserProjection {

    Long getId();

    String getUsername();

    String getEmail();

    String getFullName();

    String getPhone();

    String getAddress();

    LocalDateTime getCreatedAt();

    String getPhotoFileName();
}
