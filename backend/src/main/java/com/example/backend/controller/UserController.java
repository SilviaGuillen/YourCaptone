package com.example.backend.controller;
import com.example.backend.model.AppUser;
import com.example.backend.model.UserGroupObject;
import com.example.backend.dto.UserWOId;
import com.example.backend.service.GroupService;
import com.example.backend.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final GroupService groupService;

    @PostMapping
    public AppUser registerNewUser(@RequestBody UserWOId newUser) {
        return  userService.registerNewUser(newUser);
    }
    @PostMapping("/login")
    public UserGroupObject login() {
        if (SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString().equals("[PRIVATE]")) {
            return new UserGroupObject(
                    userService.getUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName()),
                    null);
        } else {
            return new UserGroupObject(null,
                    groupService.getGroupByUsername(SecurityContextHolder.getContext().getAuthentication().getName()));
        }
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
        SecurityContextHolder.clearContext();
    }

    @GetMapping("/{username}")
    public AppUser getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }
}














