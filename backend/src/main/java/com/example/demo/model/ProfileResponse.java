package com.example.demo.model;

import java.time.LocalDateTime;

public class ProfileResponse {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String phone;
    private String address;
    private LocalDateTime createdAt;
    private String photoReference;

    public static ProfileResponse fromUser(User user) {
        ProfileResponse r = new ProfileResponse();
        r.setId(user.getId());
        r.setUsername(user.getUsername());
        r.setEmail(user.getEmail());
        r.setFullName(user.getFullName());
        r.setPhone(user.getPhone());
        r.setAddress(user.getAddress());
        r.setCreatedAt(user.getCreatedAt());
        if (user.getPhotoData() != null && user.getPhotoData().length > 0) {
            r.setPhotoReference("/api/profile/photo");
        }
        return r;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public String getPhotoReference() { return photoReference; }
    public void setPhotoReference(String photoReference) { this.photoReference = photoReference; }
}
