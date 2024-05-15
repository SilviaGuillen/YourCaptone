package com.example.backend.service;


import com.example.backend.model.Freetime;
import com.example.backend.model.FreetimeCategory;
import com.example.backend.model.FreetimeDto;
import com.example.backend.model.FreetimeModus;
import com.example.backend.repository.FreeTimeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class FreeTimeService {
    private final FreeTimeRepository repo;
    private final IdGenerator idGenerator;

    public List<Freetime> getAllFreetime(){return repo.findAll();}

    public Freetime createNewFreetime(FreetimeDto newFreetime) {
        Freetime freetime = new Freetime(
                idGenerator.generateId(),
                newFreetime.freetimeName(),
                newFreetime.freetimeDate(),
                newFreetime.freetimeHours(),
                FreetimeCategory.valueOf(newFreetime.category().toUpperCase()),
                FreetimeModus.valueOf(newFreetime.modus().toUpperCase())

        ); repo.save(freetime);
        return freetime;
    }
    public Freetime findFreetimeById(String id) {
        return repo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("FreeTime id: " + id + " not found!"));

    }

    public Freetime updateFreetime(FreetimeDto freetime, String id) {
        Freetime freetimeToUpdate = new Freetime(
                id,
                freetime.freetimeName(),
                freetime.freetimeDate(),
                freetime.freetimeHours(),
                FreetimeCategory.valueOf(freetime.category().toUpperCase()),
                FreetimeModus.valueOf(freetime.modus().toUpperCase()));
        return repo.save(freetimeToUpdate);
    }

    public void deleteFreetime (String id) {
        repo.deleteById(id);
    }


}

