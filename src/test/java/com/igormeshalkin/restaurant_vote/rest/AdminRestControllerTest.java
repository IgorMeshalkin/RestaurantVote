//package com.igormeshalkin.restaurant_vote.rest;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.igormeshalkin.restaurant_vote.util.UserTestUtil;
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
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//@TestPropertySource("/application-test.properties")
//@Sql(value = {"/user-before.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
//@Sql(value = {"/user-after.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
//class AdminRestControllerTest {
//    @Autowired
//    ObjectMapper objectMapper;
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Test
//    @WithUserDetails("admin")
//    void getAll() throws Exception {
//        mockMvc.perform(get("/api/admin/users"))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andExpect(content().json(objectMapper.writeValueAsString(UserTestUtil.getUserDtoList())));
//    }
//
//    @Test
//    @WithUserDetails("ivan")
//    void getAllWithoutPermissions() throws Exception {
//        mockMvc.perform(get("/api/admin/users"))
//                .andExpect(status().isForbidden());
//    }
//
//    @Test
//    @WithUserDetails("admin")
//    void getByCorrectId() throws Exception {
//        mockMvc.perform(get("/api/admin/users/by-id/2"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(2))
//                .andExpect(jsonPath("$.username").value("ivan"));
//    }
//
//    @Test
//    @WithUserDetails("admin")
//    void getByUnCorrectId() throws Exception {
//        mockMvc.perform(get("/api/admin/users/by-id/4"))
//                .andExpect(status().isNotFound());
//    }
//
//    @Test
//    @WithUserDetails("admin")
//    void getByCorrectUsername() throws Exception {
//        mockMvc.perform(get("/api/admin/users/by-username/petr"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(3))
//                .andExpect(jsonPath("$.lastName").value("Петров"));
//    }
//
//    @Test
//    @WithUserDetails("admin")
//    void getByUnCorrectUsername() throws Exception {
//        mockMvc.perform(get("/api/admin/users/by-username/sergey"))
//                .andExpect(status().isNotFound());
//    }
//
//    @Test
//    @WithUserDetails("admin")
//    void updateUser() throws Exception {
//        mockMvc.perform(put("/api/admin/users")
//                        .content(objectMapper.writeValueAsString(UserTestUtil.getUserForUpdate()))
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(2))
//                .andExpect(jsonPath("$.lastName").value("Сергеев"));
//    }
//
//    @Test
//    @WithUserDetails("admin")
//    void updateUserWithRole() throws Exception {
//        mockMvc.perform(put("/api/admin/users")
//                        .content(objectMapper.writeValueAsString(UserTestUtil.getUserForUpdateWithRole()))
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(3))
//                .andExpect(jsonPath("$.lastName").value("Петров"))
//                .andExpect(jsonPath("$.role").value("ADMIN"));
//    }
//
//    @Test
//    @WithUserDetails("admin")
//    void deleteUser() throws Exception {
//        mockMvc.perform(get("/api/admin/users/by-id/3"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(3))
//                .andExpect(jsonPath("$.lastName").value("Петров"));
//
//        mockMvc.perform(delete("/api/admin/users/3"))
//                .andExpect(status().isOk());
//
//        mockMvc.perform(get("/api/admin/users/by-id/3"))
//                .andExpect(status().isNotFound());
//    }
//}