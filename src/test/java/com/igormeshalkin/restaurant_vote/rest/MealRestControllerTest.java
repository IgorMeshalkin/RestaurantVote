//package com.igormeshalkin.restaurant_vote.rest;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.igormeshalkin.restaurant_vote.util.RestaurantAndMealTestUtil;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.security.test.context.support.WithUserDetails;
//import org.springframework.test.context.TestPropertySource;
//import org.springframework.test.context.jdbc.Sql;
//import org.springframework.test.web.servlet.MockMvc;
//
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//@TestPropertySource("/application-test.properties")
//@Sql(value = {"/all-tables-before.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
//@Sql(value = {"/all-tables-after.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
//class MealRestControllerTest {
//    @Autowired
//    ObjectMapper objectMapper;
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Test
//    @WithUserDetails("ivan")
//    void getMenu() throws Exception {
//        mockMvc.perform(get("/api/meals/1"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.[0].name").value("Сендвич"))
//                .andExpect(jsonPath("$.[1].name").value("Чай"))
//                .andExpect(jsonPath("$.[0].price").value(125.5));
//    }
//
//    @Test
//    @WithUserDetails("admin")
//    void createAndAddToRestaurantMenu() throws Exception {
//        mockMvc.perform(post("/api/meals/3")
//                        .content(objectMapper.writeValueAsString(RestaurantAndMealTestUtil.getMealForCreate()))
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(7))
//                .andExpect(jsonPath("$.name").value("Гамбургер"));
//
//        mockMvc.perform(get("/api/restaurants/by-id/3"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.menu.[2].price").value(162.8));
//    }
//
//    @Test
//    @WithUserDetails("admin")
//    void updateUser() throws Exception {
//        mockMvc.perform(put("/api/meals")
//                        .content(objectMapper.writeValueAsString(RestaurantAndMealTestUtil.getMealForUpdate()))
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.price").value(180.56));
//
//        mockMvc.perform(get("/api/restaurants/by-id/3"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.menu.[0].price").value(180.56));
//    }
//
//    @Test
//    @WithUserDetails("admin")
//    void deleteUser() throws Exception {
//        mockMvc.perform(delete("/api/meals/1"))
//                .andExpect(status().isOk());
//    }
//}