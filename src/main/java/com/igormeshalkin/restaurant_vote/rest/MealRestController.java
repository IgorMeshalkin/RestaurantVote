package com.igormeshalkin.restaurant_vote.rest;

import com.igormeshalkin.restaurant_vote.dto.MealDto;
import com.igormeshalkin.restaurant_vote.model.Meal;
import com.igormeshalkin.restaurant_vote.model.Restaurant;
import com.igormeshalkin.restaurant_vote.service.MealService;
import com.igormeshalkin.restaurant_vote.service.RestaurantService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/meals")
public class MealRestController {
    private final MealService mealService;
    private final RestaurantService restaurantService;

    public MealRestController(MealService mealService, RestaurantService restaurantService) {
        this.mealService = mealService;
        this.restaurantService = restaurantService;
    }

    @GetMapping("/{restaurant_id}")
    @PreAuthorize("hasAuthority('everything:read entries')")
    public ResponseEntity<List<MealDto>> getMenu(@PathVariable Long restaurant_id) {
        Restaurant restaurant = restaurantService.findById(restaurant_id);
        if(restaurant == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            List<MealDto> result = restaurant.getMenu().stream()
                    .map(MealDto::fromMeal)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    @PostMapping("/{restaurant_id}")
    @PreAuthorize("hasAuthority('everything:change entries')")
    public ResponseEntity<Meal> createAndAddToRestaurantMenu(@RequestBody Meal meal,
                                                             @PathVariable Long restaurant_id){
        Restaurant restaurant = restaurantService.findById(restaurant_id);
        if(restaurant == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            Meal result = mealService.create(meal, restaurant);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    @PutMapping
    @PreAuthorize("hasAuthority('everything:change entries')")
    public ResponseEntity<Meal> update(@RequestBody Meal meal) {
        Meal result = mealService.update(meal);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('everything:change entries')")
    public void delete(@PathVariable Long id) {
        mealService.delete(id);
    }
}
