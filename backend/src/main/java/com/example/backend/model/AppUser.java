package com.example.backend.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class AppUser {

    private final String id;
    private final String firstName;
    private final String lastName;
    private final String mail;
    private final String userName;
    private final String password;
    private final Role role;
}
