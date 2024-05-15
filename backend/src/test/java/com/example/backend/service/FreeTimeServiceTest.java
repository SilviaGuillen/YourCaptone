package com.example.backend.service;

import com.example.backend.model.Freetime;
import com.example.backend.model.FreetimeCategory;
import com.example.backend.model.FreetimeDto;
import com.example.backend.model.FreetimeModus;
import com.example.backend.repository.FreeTimeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

class FreeTimeServiceTest {

    private FreeTimeService freeTimeService;
    private FreeTimeRepository mockFreetimeRepository;
    private IdGenerator mockIdGenerator;


    @BeforeEach
    void setUp() {
        mockFreetimeRepository = mock(FreeTimeRepository.class);
        mockIdGenerator = mock(IdGenerator.class);
        freeTimeService = new FreeTimeService(mockFreetimeRepository, mockIdGenerator);
    }



    @Test
    void TestGetAllFreetime() {
        List<Freetime> freetimes = List.of(
                new Freetime("id1","time with mama", "Muttertag", "all day", FreetimeCategory.FAMILY, FreetimeModus.IN_PERSON),
                new Freetime("id2","chef meeting", "Mondays", "11 AM", FreetimeCategory.JOB, FreetimeModus.PHONE),
                new Freetime("id3","Oskar's Birthday", "17.07.24", "from 5 to 10pm",FreetimeCategory.FRIENDS, FreetimeModus.VIDEO)
        );
        when(mockFreetimeRepository.findAll()).thenReturn(freetimes);

        List<Freetime> actual = freeTimeService.getAllFreetime();

        assertEquals(freetimes, actual);
    }

    @Test
    void createNewFreetime() {

        FreetimeDto freetime= new FreetimeDto("time with mama", "Muttertag", "all day", "Family", "in_person");

        Freetime actual = freeTimeService.createNewFreetime(freetime);

        assertEquals(freetime.freetimeName(), actual.freetimeName());
        assertEquals(freetime.freetimeDate(), actual.freetimeDate());
        assertEquals(freetime.freetimeHours(), actual.freetimeHours());
        assertEquals(freetime.category(), actual.category());
        assertEquals(freetime.modus(), actual.modus());
        verify(mockFreetimeRepository, times(1)).save(actual);


    }

    @Test
    void testFindFreetimeById() {
        Freetime freetime = new Freetime("id1","time with mama", "Muttertag", "all day", FreetimeCategory.FAMILY, FreetimeModus.IN_PERSON);
        when(mockFreetimeRepository.findById("id1")).thenReturn(Optional.of(freetime));

        Freetime actual = freeTimeService.findFreetimeById("id1");

        assertEquals(freetime, actual);
        verify(mockFreetimeRepository, times(1)).findById("id1");
    }

    @Test
    void testUpdateFreetime() {
        FreetimeDto freetime = new FreetimeDto("time with mama", "Muttertag", "all day", "FAMILY", "IN_PERSON");
        Freetime freetime1 = new Freetime("1","time with mama", "Muttertag", "all day", FreetimeCategory.FAMILY,FreetimeModus.IN_PERSON);
        when(mockFreetimeRepository.save(freetime1)).thenReturn(freetime1);


        Freetime actual = freeTimeService.updateFreetime(freetime, "1");

        assertEquals(freetime1, actual);
        verify(mockFreetimeRepository, times(1)).save(freetime1);
    }

    @Test
    void testDeleteFreetime() {
        freeTimeService.deleteFreetime("id1");

        verify(mockFreetimeRepository, times(1)).deleteById("id1");
    }
}