package com.igormeshalkin.restaurant_vote.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.igormeshalkin.restaurant_vote.model.Photo;
import com.igormeshalkin.restaurant_vote.model.Restaurant;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RestaurantFullDto extends RestaurantDto {
    private List<PhotoDTO> photos;

    public static RestaurantFullDto fromRestaurant(Restaurant restaurant) {
        RestaurantFullDto restaurantFullDto = new RestaurantFullDto();
        restaurantFullDto.setId(restaurant.getId());
        restaurantFullDto.setName(restaurant.getName());
        restaurantFullDto.setAddress(restaurant.getAddress());
        restaurantFullDto.setPhoneNumber(restaurant.getPhoneNumber());
        restaurantFullDto.setLunchTime(restaurant.getLunchTime());
        restaurantFullDto.setCuisine(restaurant.getCuisine());
        restaurantFullDto.setPrice(restaurant.getPrice());
        restaurantFullDto.setUserId(restaurant.getUser() == null ? null : restaurant.getUser().getId());
        restaurantFullDto.setRating((long) restaurant.getVotes().size());
        restaurantFullDto.setMenu(restaurant.getMenu().stream()
                .map(MealDto::fromMeal)
                .collect(Collectors.toList()));
        restaurantFullDto.setPhotos(restaurant.getPhotos()
                .stream().map(PhotoDTO::fromPhoto)
                .collect(Collectors.toList()));
        return restaurantFullDto;
    }
}
