package com.example.backend.repository;

import com.example.backend.model.Group;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroupRepo extends MongoRepository<Group, String> {
    Optional<Group> findGroupByUserName(String username);
}
