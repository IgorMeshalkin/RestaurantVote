package com.igormeshalkin.restaurant_vote.rest;

import com.igormeshalkin.restaurant_vote.dto.UserDto;
import com.igormeshalkin.restaurant_vote.model.User;
import com.igormeshalkin.restaurant_vote.service.impl.UserServiceImpl;
import com.igormeshalkin.restaurant_vote.util.SecurityUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/users")
public class AdminRestController {

    private final UserServiceImpl userService;

    public AdminRestController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('users:read any entries')")
    public ResponseEntity<List<UserDto>> getAll() {
        List<UserDto> allUsers = userService.findAll().stream()
                .map(UserDto::fromUser)
                .collect(Collectors.toList());
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }

    @GetMapping("/by-id/{id}")
    @PreAuthorize("hasAuthority('users:read any entries')")
    public ResponseEntity<UserDto> getById(@PathVariable Long id) {
        User user = userService.findById(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(UserDto.fromUser(user), HttpStatus.OK);
        }
    }

    @GetMapping("/by-username/{username}")
    @PreAuthorize("hasAuthority('users:read any entries')")
    public ResponseEntity<UserDto> getByUsername(@PathVariable String username) {
        User user = userService.findByUsername(username);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(UserDto.fromUser(user), HttpStatus.OK);
        }
    }

    @PutMapping
    @PreAuthorize("hasAuthority('users:change any entries')")
    public ResponseEntity<UserDto> update(@RequestBody User user) {
        User result = userService.update(user, SecurityUtil.getCurrentUser());
        return new ResponseEntity<>(UserDto.fromUser(result), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('users:change any entries')")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}
