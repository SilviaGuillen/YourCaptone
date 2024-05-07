package com.example.backend.controller;

import com.example.backend.model.Freetime;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("api/freetime")
@RestController
@RequiredArgsConstructor
public class  FreeTimeController{

    private final FreeTimeController service;

    @GetMapping("/getAll")
    public List<Freetime> getAllFreetime() {return service.getAllFreetime();}

    @GetMapping("/get/{date}")
    public Freetime getFreetimeByDate(@PathVariable String date) {return service.getFreetimeByDate(date);
    }

    @PostMapping("/add")
    public Freetime createNewFreetime(@RequestBody Freetime newFreetime) {return service.createNewFreetime(newFreetime);}

    @PutMapping("/edit")
    public Freetime updateFreetime(@RequestBody Freetime freetime, @PathVariable String id) {return service.updateFreetime(freetime,id);}

    @DeleteMapping("/delete/{id}")
    public void  deleteFreetime(@PathVariable String id) {
        service.deleteFreetime(id);
    }


}