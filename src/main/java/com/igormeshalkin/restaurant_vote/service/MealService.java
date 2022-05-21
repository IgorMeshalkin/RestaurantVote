package com.igormeshalkin.restaurant_vote.service;

import com.igormeshalkin.restaurant_vote.model.Meal;
import com.igormeshalkin.restaurant_vote.model.Restaurant;
import com.igormeshalkin.restaurant_vote.repository.MealRepository;
import com.igormeshalkin.restaurant_vote.util.TimeZoneUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Slf4j
public class MealService {
    private final MealRepository mealRepository;

    public MealService(MealRepository mealRepository) {
        this.mealRepository = mealRepository;
    }

    public Meal create(Meal meal, Restaurant restaurant) {
        LocalDateTime dateTime = LocalDateTime.now(TimeZoneUtil.SERVER_ZONE_ID);
        meal.setCreated(dateTime);
        meal.setUpdated(dateTime);

        meal.setRestaurant(restaurant);
        Meal result = mealRepository.save(meal);
        log.info("IN create - meal: {} successfully created", result);
        return result;
    }

    public Meal update(Meal meal) {
        Meal mealFromDb = mealRepository.findById(meal.getId()).orElse(null);
        if (mealFromDb == null) {
            log.info("IN update - meal with id \"{}\" not found for update)", meal.getId());
            return meal;
        }

        LocalDateTime dateTime = LocalDateTime.now(TimeZoneUtil.SERVER_ZONE_ID);
        meal.setCreated(mealFromDb.getCreated());
        meal.setUpdated(dateTime);
        meal.setRestaurant(mealFromDb.getRestaurant());

        Meal result = mealRepository.save(meal);
        log.info("IN update - meal: {} successfully updated", result);
        return result;
    }

    public void delete(Long id) {
        mealRepository.deleteById(id);
        log.info("IN delete - meal with id: \"{}\" successfully deleted", id);
    }
}
