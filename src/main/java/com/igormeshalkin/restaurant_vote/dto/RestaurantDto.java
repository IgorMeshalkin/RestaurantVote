package com.igormeshalkin.restaurant_vote.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.igormeshalkin.restaurant_vote.model.Comment;
import com.igormeshalkin.restaurant_vote.model.Photo;
import com.igormeshalkin.restaurant_vote.model.Restaurant;
import com.igormeshalkin.restaurant_vote.model.СuisineType;
import lombok.Data;

import javax.persistence.Column;
import java.util.List;
import java.util.stream.Collectors;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RestaurantDto {
    private Long id;
    private String name;
    private String address;
    private String phoneNumber;
    private String lunchTime;
    private СuisineType cuisine;
    private Double price;
    private Long rating;
    private List<MealDto> menu;
    private Long userId;

    public static RestaurantDto fromRestaurant(Restaurant restaurant) {
        RestaurantDto restaurantDto = new RestaurantDto();
        restaurantDto.setId(restaurant.getId());
        restaurantDto.setName(restaurant.getName());
        restaurantDto.setAddress(restaurant.getAddress());
        restaurantDto.setPhoneNumber(restaurant.getPhoneNumber());
        restaurantDto.setLunchTime(restaurant.getLunchTime());
        restaurantDto.setCuisine(restaurant.getCuisine());
        restaurantDto.setPrice(restaurant.getPrice());
        if (restaurant.getVotes() != null) {
            restaurantDto.setRating((long) restaurant.getVotes().size());
        }
        if (restaurant.getMenu() != null) {
            restaurantDto.setMenu(restaurant.getMenu().stream()
                    .map(MealDto::fromMeal)
                    .collect(Collectors.toList()));
        }
        restaurantDto.setUserId(restaurant.getUser() == null ? null : restaurant.getUser().getId());
        return restaurantDto;
    }
}

