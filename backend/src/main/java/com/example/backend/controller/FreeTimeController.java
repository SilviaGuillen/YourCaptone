package com.example.backend.controller;

import com.example.backend.model.Freetime;
import com.example.backend.service.FreeTimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("api/freetime")
@RestController
@RequiredArgsConstructor
public class  FreeTimeController {

    private final FreeTimeService service;

    @GetMapping("/getAll")
    public List<Freetime> getAllFreeTime() {return service.getAllFreetime();}

    @GetMapping("/get/{id}")
    public Freetime getFreeTimeById(@PathVariable String id) {return service.findFreetimeById(id);
    }

    @PostMapping("/add")
    public Freetime createNewFreeTime(@RequestBody Freetime newFreetime) {return service.createNewFreetime(newFreetime);}

    @PutMapping("/edit/{id}")
    public Freetime updateFreeTime(@RequestBody Freetime freetime, @PathVariable String id) {return service.updateFreetime(freetime,id);}

    @DeleteMapping("/delete/{id}")
    public void  deleteFreeTime(@PathVariable String id) {
        service.deleteFreetime(id);
    }


}