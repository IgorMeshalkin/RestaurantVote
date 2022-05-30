package com.igormeshalkin.restaurant_vote.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.igormeshalkin.restaurant_vote.util.RestaurantAndMealTestUtil;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
@Sql(value = {"/all-tables-before.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/all-tables-after.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
class RestaurantRestControllerTest {
    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithUserDetails("ivan")
    void getAll() throws Exception {
        mockMvc.perform(get("/api/restaurants"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(objectMapper.writeValueAsString(RestaurantAndMealTestUtil.getRestaurantDtoList())));
    }

    @Test
    @WithUserDetails("ivan")
    void getByCorrectId() throws Exception {
        mockMvc.perform(get("/api/restaurants/by-id/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Subway"));
    }

    @Test
    @WithUserDetails("ivan")
    void getByUnCorrectId() throws Exception {
        mockMvc.perform(get("/api/restaurants/by-id/4"))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithUserDetails("petr")
    void getByCorrectName() throws Exception {
        mockMvc.perform(get("/api/restaurants/by-name/KFC"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.menu").isArray())
                .andExpect(jsonPath("$.menu.length()").value(2))
                .andExpect(jsonPath("$.menu.[0].name").value("Чизбургер"))
                .andExpect(jsonPath("$.menu.[1].price").value(93.6));
    }

    @Test
    @WithUserDetails("petr")
    void getByUnCorrectName() throws Exception {
        mockMvc.perform(get("/api/restaurants/by-Name/McDonald's"))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithUserDetails("admin")
    void createRestaurant() throws Exception {
        mockMvc.perform(post("/api/restaurants")
                        .content(objectMapper.writeValueAsString(RestaurantAndMealTestUtil.getRestaurantForCreate()))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(4))
                .andExpect(jsonPath("$.name").value("McDonald's"));
    }

    @Test
    @WithUserDetails("admin")
    void updateRestaurant() throws Exception {
        mockMvc.perform(put("/api/restaurants")
                        .content(objectMapper.writeValueAsString(RestaurantAndMealTestUtil.getRestaurantForUpdate()))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(3))
                .andExpect(jsonPath("$.name").value("McDonald's"));
    }

    @Test
    @WithUserDetails("admin")
    void deleteRestaurant() throws Exception {
        mockMvc.perform(get("/api/restaurants/by-id/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Subway"));

        mockMvc.perform(delete("/api/restaurants/1"))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/restaurants/by-id/1"))
                .andExpect(status().isNotFound());
    }
}