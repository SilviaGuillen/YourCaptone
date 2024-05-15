package com.example.backend.controller;

import com.example.backend.model.Freetime;
import com.example.backend.model.FreetimeCategory;
import com.example.backend.model.FreetimeDto;
import com.example.backend.model.FreetimeModus;
import com.example.backend.service.FreeTimeService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class FreeTimeControllerTest {

    private FreeTimeController freeTimeController;
    private FreeTimeService mockFreeTimeService;


    @BeforeEach
    void setUp() {
        mockFreeTimeService = mock(FreeTimeService.class);
        freeTimeController = new FreeTimeController(mockFreeTimeService);
    }


    @Test
    void getAllFreeTime() {
        List<Freetime> freetimes = List.of(
                new Freetime("id0", "time with mama", "Muttertag", "all day", FreetimeCategory.NONE, FreetimeModus.NONE),
                new Freetime("id1", "time with mama", "Muttertag", "all day", FreetimeCategory.FAMILY, FreetimeModus.IN_PERSON),
                new Freetime("id2", "chef meeting", "Mondays", "11 AM", FreetimeCategory.JOB, FreetimeModus.PHONE),
                new Freetime("id3", "Oskar's Birthday", "17.07.24", "from 5 to 10pm", FreetimeCategory.FRIENDS, FreetimeModus.VIDEO)
        );
        when(mockFreeTimeService.getAllFreetime()).thenReturn(freetimes);
        List<Freetime> actual = freeTimeController.getAllFreeTime();
        assertEquals(freetimes, actual);
    }


    @Test
    void getFreeTimeById() {
        Freetime freetime = new Freetime("id1", "time with mama", "Muttertag", "all day", FreetimeCategory.FAMILY, FreetimeModus.IN_PERSON);
        when(mockFreeTimeService.findFreetimeById("id1")).thenReturn(freetime);
        Freetime actual = freeTimeController.getFreeTimeById("id1");
        assertEquals(freetime, actual);
        verify(mockFreeTimeService, times(1)).findFreetimeById("id1");
    }

    @Test
    void createNewFreeTime() {
        FreetimeDto freetime = new FreetimeDto("time with mama", "Muttertag", "all day", "FAMILY", "IN_PERSON");
        Freetime freetime1 = new Freetime("1","time with mama", "Muttertag", "all day", FreetimeCategory.FAMILY,FreetimeModus.IN_PERSON);

        when(mockFreeTimeService.createNewFreetime(freetime)).thenReturn(freetime1);

        Freetime newFreetime = freeTimeController.createNewFreeTime(freetime);

        assertEquals(freetime1, newFreetime);
        verify(mockFreeTimeService, times(1)).createNewFreetime(freetime);


    }

    @Test
    void updateFreeTime() {
        FreetimeDto freetime = new FreetimeDto("time with mama", "Muttertag", "all day", "FAMILY", "IN_PERSON");
        Freetime freetime1 = new Freetime("1","time with mama", "Muttertag", "all day", FreetimeCategory.FAMILY,FreetimeModus.IN_PERSON);
        when(mockFreeTimeService.updateFreetime(freetime, "id1")).thenReturn(freetime1);

        Freetime newFreetime = freeTimeController.updateFreeTime(freetime, "id1");

        assertEquals(freetime1, newFreetime);
        verify(mockFreeTimeService, times(1)).updateFreetime(freetime,"id1");


    }

    @Test
    void deleteFreeTime() {
        freeTimeController.deleteFreeTime("id1");
        verify(mockFreeTimeService, times(1)).deleteFreetime(anyString());
    }
}