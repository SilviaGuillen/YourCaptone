package com.example.backend.model;
import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    GROUP,
    PRIVATE;


    @Override
    public String getAuthority() {
        return null;
    }
}
