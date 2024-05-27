package com.example.backend.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import com.example.backend.model.AppUser;

@Repository
public interface UserRepo extends MongoRepository<AppUser, String> {
    Optional<AppUser> findUserByUserName(String username);
}