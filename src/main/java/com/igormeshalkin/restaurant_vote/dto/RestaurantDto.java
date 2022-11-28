package com.igormeshalkin.restaurant_vote.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.igormeshalkin.restaurant_vote.model.Restaurant;
import com.igormeshalkin.restaurant_vote.model.СuisineType;
import lombok.Data;

import javax.persistence.Column;
import java.util.List;
import java.util.stream.Collectors;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RestaurantDto {
    private String name;
    private String address;
    private String lunchTime;
    private СuisineType cuisine;
    private Double price;
    private Long rating;
    private List<MealDto> menu;

    public static RestaurantDto fromRestaurant(Restaurant restaurant) {
        RestaurantDto restaurantDto = new RestaurantDto();
        restaurantDto.setName(restaurant.getName());
        restaurantDto.setAddress(restaurant.getAddress());
        restaurantDto.setLunchTime(restaurant.getLunchTime());
        restaurantDto.setCuisine(restaurant.getCuisine());
        restaurantDto.setPrice(restaurant.getPrice());
        restaurantDto.setRating((long) restaurant.getVotes().size());
        restaurantDto.setMenu(restaurant.getMenu().stream()
                .map(MealDto::fromMeal)
                .collect(Collectors.toList()));
        return restaurantDto;
    }
}
