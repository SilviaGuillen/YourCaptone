package com.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

public record FreetimeDto(


        String freetimeName,
        String freetimeDate,
        String freetimeHours,
        String category,
        String modus

) {






}
