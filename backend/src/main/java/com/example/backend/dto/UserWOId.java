package com.example.backend.dto;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class UserWOId {

    private final String firstName;
    private final String lastName;
    private final String mail;
    private final String userName;
    private final String password;

}