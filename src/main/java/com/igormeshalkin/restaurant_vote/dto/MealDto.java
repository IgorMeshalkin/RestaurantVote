package com.igormeshalkin.restaurant_vote.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.igormeshalkin.restaurant_vote.model.Meal;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class MealDto {
    private Long id;
    private String name;
    private int weight;

    public static MealDto fromMeal(Meal meal) {
        MealDto mealDto = new MealDto();
        mealDto.setId(meal.getId());
        mealDto.setName(meal.getName());
        mealDto.setWeight(meal.getWeight());
        return mealDto;
    }
}
