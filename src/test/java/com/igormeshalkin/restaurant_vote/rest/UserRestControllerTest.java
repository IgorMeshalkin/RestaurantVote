package com.igormeshalkin.restaurant_vote.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.igormeshalkin.restaurant_vote.util.UserTestUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
@Sql(value = {"/user-before.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/user-after.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
class UserRestControllerTest {
    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;

    @Test
    void create() throws Exception {
        mockMvc.perform(post("/api/users")
                        .content(objectMapper.writeValueAsString(UserTestUtil.getUserForCreate()))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(4))
                .andExpect(jsonPath("$.lastName").value("Сергеев"));
    }

    @Test
    @WithUserDetails("ivan")
    void getUser() throws Exception {
        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(2))
                .andExpect(jsonPath("$.lastName").value("Иванов"));
    }

    @Test
    @WithUserDetails("ivan")
    void updateUser() throws Exception {
        mockMvc.perform(put("/api/users")
                        .content(objectMapper.writeValueAsString(UserTestUtil.getUserForUpdate()))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(2))
                .andExpect(jsonPath("$.lastName").value("Сергеев"));
    }

    @Test
    @WithUserDetails("petr")
    void updateUserWithRole() throws Exception {
        mockMvc.perform(put("/api/users")
                        .content(objectMapper.writeValueAsString(UserTestUtil.getUserForUpdateWithRole()))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(3))
                .andExpect(jsonPath("$.lastName").value("Петров"))
                .andExpect(jsonPath("$.role").value("USER"));
    }

    @Test
    @WithUserDetails("petr")
    void updateAnotherUser() throws Exception {
        mockMvc.perform(put("/api/users")
                        .content(objectMapper.writeValueAsString(UserTestUtil.getUserForUpdate()))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithUserDetails("petr")
    void deleteUser() throws Exception {
        mockMvc.perform(delete("/api/users"))
                .andExpect(status().isOk());
    }
}