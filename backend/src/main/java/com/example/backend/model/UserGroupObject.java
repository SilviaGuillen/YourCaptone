package com.example.backend.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class UserGroupObject {

    private final AppUser user;
    private final Group group;
}
