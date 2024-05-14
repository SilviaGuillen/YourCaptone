package com.example.backend.repository;

import com.example.backend.model.Freetime;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FreeTimeRepository extends MongoRepository<Freetime,String> {
}
