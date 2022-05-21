package com.igormeshalkin.restaurant_vote.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.igormeshalkin.restaurant_vote.model.Meal;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class MealDto {
    private String name;
    private double price;

    public static MealDto fromMeal(Meal meal) {
        MealDto mealDto = new MealDto();
        mealDto.setName(meal.getName());
        mealDto.setPrice(meal.getPrice());
        return mealDto;
    }
}
