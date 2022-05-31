package com.igormeshalkin.restaurant_vote.rest;

import com.igormeshalkin.restaurant_vote.dto.UserDto;
import com.igormeshalkin.restaurant_vote.model.User;
import com.igormeshalkin.restaurant_vote.service.UserService;
import com.igormeshalkin.restaurant_vote.util.SecurityUtil;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserRestController {
    private final UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    @ApiOperation("Create new account")
    public ResponseEntity<UserDto> create(@RequestBody User user) {
        User result = userService.create(user);
        return new ResponseEntity<>(UserDto.fromUser(result), HttpStatus.OK);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('users:read your entries')")
    @ApiOperation("Get information about the current account")
    public ResponseEntity<UserDto> get() {
        User user = SecurityUtil.getCurrentUser();
        return new ResponseEntity<>(UserDto.fromUser(user), HttpStatus.OK);
    }

    @PutMapping
    @PreAuthorize("hasAuthority('users:change your entries')")
    @ApiOperation("Update current account (unable to update role and activity)")
    public ResponseEntity<UserDto> update(@RequestBody User user) {
        User currentUser = SecurityUtil.getCurrentUser();
        if (currentUser.getUsername().equals(user.getUsername())) {
            User result = userService.update(user);
            return new ResponseEntity<>(UserDto.fromUser(result), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping
    @PreAuthorize("hasAuthority('users:change your entries')")
    @ApiOperation("Delete current account")
    public void delete() {
        User user = SecurityUtil.getCurrentUser();
        userService.delete(user.getId());
    }

}
