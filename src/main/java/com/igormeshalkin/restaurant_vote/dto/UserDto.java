package com.igormeshalkin.restaurant_vote.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.igormeshalkin.restaurant_vote.model.Restaurant;
import com.igormeshalkin.restaurant_vote.model.Role;
import com.igormeshalkin.restaurant_vote.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private Role role;
    private boolean active;
    private List<RestaurantDto> restaurants;

    public static UserDto fromUser(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setRole(user.getRole());
        userDto.setActive(user.isActive());

        if (user.getRestaurants() != null) {
            List<RestaurantDto> restaurants = new ArrayList<>();
            user.getRestaurants().forEach(rest -> restaurants.add(RestaurantDto.fromRestaurant(rest)));
            userDto.setRestaurants(restaurants);
        }

        return userDto;
    }
}
