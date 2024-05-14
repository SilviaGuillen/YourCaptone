package com.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection =  "freetime")
public record Freetime (

        @Id
        String id,
        String freetimeName,
        String freetimeDate,
        String freetimeHours,
        FreetimeCategory category,
        FreetimeModus modus




) {


}