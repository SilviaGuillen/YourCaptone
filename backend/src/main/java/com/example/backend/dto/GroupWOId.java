package com.example.backend.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class GroupWOId {

    private final String name;
    private final String street;
    private final String postalCode;
    private final String city;
    private final String mail;
    private final String userName;
    private final String password;
}
