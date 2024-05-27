package com.example.backend.service;

import com.example.backend.model.Group;
import com.example.backend.dto.GroupWOId;
import com.example.backend.model.Role;
import com.example.backend.repository.GroupRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor




public class GroupService {

    private final GroupRepo repo;
    private final IdService idService;

    private final HashService hashService;

    public List<Group> getAllGroup() {
        return repo.findAll();
    }

    public Group saveNewGroup(GroupWOId newGroup) {

        Group group = new Group(
                idService.createId(),
                newGroup.getName(),
                newGroup.getStreet(),
                newGroup.getPostalCode(),
                newGroup.getCity(),
                newGroup.getMail(),
                newGroup.getUserName(),
                hashService.hashPassword(newGroup.getPassword()),

                Role.GROUP
        );
        repo.save(group);
        return group;

    }

    public Group getGroupByUsername(String username) {
        return repo.findGroupByUserName(username).orElseThrow();
    }
}