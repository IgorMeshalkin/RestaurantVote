package com.igormeshalkin.restaurant_vote.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.igormeshalkin.restaurant_vote.model.Restaurant;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@Component
public class RestaurantDto {
    private String name;
    private Long rating;
    private List<MealDto> menu;

    public static RestaurantDto fromRestaurant(Restaurant restaurant) {
        RestaurantDto restaurantDto = new RestaurantDto();
        restaurantDto.setName(restaurant.getName());
        restaurantDto.setRating((long) restaurant.getVotes().size());
        restaurantDto.setMenu(restaurant.getMenu().stream()
                .map(MealDto::fromMeal)
                .collect(Collectors.toList()));
        return restaurantDto;
    }
}
