package com.igormeshalkin.restaurant_vote.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.igormeshalkin.restaurant_vote.util.TimeUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
@Sql(value = {"/all-tables-before.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/all-tables-after.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
class VoteRestControllerTest {
    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithUserDetails("ivan")
    void voteForTheRestaurant() throws Exception {
        mockMvc.perform(post("/api/votes/1"))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/restaurants/by-id/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.rating").value(1));
    }

    @Test
    @WithUserDetails("petr")
    void updateVote() throws Exception {
        LocalTime controlTime = LocalTime.parse(TimeUtil.TIME_LIMIT_FOR_UPDATE_VOTE);
        LocalTime currentTime = LocalTime.now();
        boolean timeLimitReached = controlTime.compareTo(currentTime) < 0;

        mockMvc.perform(post("/api/votes/1"))
                .andExpect(status().isOk());

        mockMvc.perform(put("/api/votes/2"))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/restaurants/by-id/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.rating").value(timeLimitReached ? 1 : 0));
    }

    @Test
    @WithUserDetails("admin")
    void deleteVote() throws Exception {
        mockMvc.perform(post("/api/votes/1"))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/restaurants/by-id/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.rating").value(1));

        mockMvc.perform(delete("/api/votes/1"))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/restaurants/by-id/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.rating").value(0));
    }
}