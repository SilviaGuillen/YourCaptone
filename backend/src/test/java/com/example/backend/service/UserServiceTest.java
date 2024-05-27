package com.example.backend.service;

import com.example.backend.dto.UserWOId;
import com.example.backend.model.AppUser;
import com.example.backend.model.Group;
import com.example.backend.model.Role;
import com.example.backend.repository.GroupRepo;
import com.example.backend.repository.UserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    UserRepo mockrepo = mock(UserRepo.class);
    GroupRepo mockrepoGroup = mock(GroupRepo.class);
    IdService mockIdService = mock(IdService.class);
    HashService mockHashService = mock(HashService.class);
    UserService userService = new UserService(mockrepo, mockrepoGroup, mockIdService, mockHashService);


    @Test
    void registerNewUser_shouldReturnAppUser_WhenCalledWithDto() {
        //GIVEN
        UserWOId newUser = new UserWOId("Vincent", "Freckmann", "v.freckmann@yahoo.de", "vreckmann", "123");
        AppUser expected = new AppUser("1", "Vincent", "Freckmann", "v.freckmann@yahoo.de", "vreckmann", "abc", Role.PRIVATE);

        when(mockrepo.save(expected)).thenReturn(expected);
        when(mockIdService.createId()).thenReturn("1");
        when(mockHashService.hashPassword(newUser.getPassword())).thenReturn("abc");

        //WHEN
        AppUser actual = userService.registerNewUser(newUser);

        //THEN
        verify(mockrepo).save(expected);
        verify(mockIdService).createId();
        verify(mockHashService).hashPassword(newUser.getPassword());
        assertEquals(expected, actual);
    }

    @Test
    void getUserByUsername_shouldReturnUser_whenCalledWithUsername() {
        //GIVEN
        String username = "Frickmann";
        AppUser expected = new AppUser("1", "Pablo", "Escobar", "escobar.p@gmail.com", "Frickmann", "abc", Role.PRIVATE);

        when(mockrepo.findUserByUserName(username)).thenReturn(Optional.of(expected));

        //WHEN
        AppUser actual = userService.getUserByUsername(username);

        //THEN
        verify(mockrepo).findUserByUserName(username);
        assertEquals(expected, actual);
    }

    @Test
    void loadUserByUsername_shouldReturnUser_whenCalledWithUsernameOfUser() {
        //GIVEN
        String username = "Frickmann";
        AppUser user = new AppUser("1", "Pablo", "Escobar", "escobar.p@gmail.com","Frickmann","abc", Role.PRIVATE);
        UserDetails expected = new User(user.getUserName(), user.getPassword(), List.of(user.getRole()));

        when(mockrepo.findUserByUserName(username)).thenReturn(Optional.of(user));
        when(mockrepoGroup.findGroupByUserName(username)).thenReturn(Optional.empty());

        //WHEN
        UserDetails actual = userService.loadUserByUsername(username);

        //THEN
        verify(mockrepo).findUserByUserName(username);
        assertEquals(actual, expected);


    }

    @Test
    void loadUserByUsername_shouldReturnGroup_whenCalledWithUsernameOfGroup() {
        //GIVEN
        String username = "Klasse2020";
        Group group = new Group("1", "Uni Kollege", "Luissental 29", "28359", "Bremen", "klasse2020@gmail.com", "Klasse2020", "123", Role.GROUP);

        UserDetails expected = new User(group.getUserName(), group.getPassword(), List.of(group.getRole()));

        when(mockrepo.findUserByUserName(username)).thenReturn(Optional.empty());
        when(mockrepoGroup.findGroupByUserName(username)).thenReturn(Optional.of(group));

        //WHEN
        UserDetails actual = userService.loadUserByUsername(username);

        //THEN
        verify(mockrepo).findUserByUserName(username);
        verify(mockrepoGroup).findGroupByUserName(username);
        assertEquals(actual, expected);
    }
}