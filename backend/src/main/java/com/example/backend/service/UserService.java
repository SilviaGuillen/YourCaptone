package com.example.backend.service;
import com.example.backend.model.AppUser;
import com.example.backend.model.Group;
import com.example.backend.model.Role;
import com.example.backend.dto.UserWOId;
import com.example.backend.repository.GroupRepo;
import com.example.backend.repository.UserRepo;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private final UserRepo repo;
    private final GroupRepo groupRepo;
    private final IdService idService;
    private final HashService hashService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<AppUser> oUser = repo.findUserByUserName(username);
        if (oUser.isPresent()) {
            AppUser user = oUser.get();
            return new User(user.getUserName(), user.getPassword(), List.of(user.getRole()));
        } else {
            Group group = groupRepo.findGroupByUserName(username).orElseThrow();
            return new User(group.getUserName(), group.getPassword(), List.of(group.getRole()));
        }
    }

    public AppUser registerNewUser(UserWOId newUser) {

        AppUser user = new AppUser(
                idService.createId(),
                newUser.getFirstName(),
                newUser.getLastName(),
                newUser.getMail(),
                newUser.getUserName(),
                hashService.hashPassword(newUser.getPassword()),
                Role.PRIVATE
        );

        repo.save(user);
        return user;
    }

    public AppUser getUserByUsername(String username) {
        return repo.findUserByUserName(username).orElseThrow();
    }
}