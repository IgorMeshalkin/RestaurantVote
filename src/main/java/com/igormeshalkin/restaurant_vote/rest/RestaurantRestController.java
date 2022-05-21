package com.igormeshalkin.restaurant_vote.rest;

import com.igormeshalkin.restaurant_vote.model.Restaurant;
import com.igormeshalkin.restaurant_vote.service.RestaurantService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantRestController {
    private final RestaurantService restaurantService;

    public RestaurantRestController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('everything:read entries')")
    public ResponseEntity<List<Restaurant>> getAll() {
        List<Restaurant> result = restaurantService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/by-id/{id}")
    @PreAuthorize("hasAuthority('everything:read entries')")
    public ResponseEntity<Restaurant> getById(@PathVariable Long id) {
        Restaurant restaurant = restaurantService.findById(id);
        if(restaurant == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(restaurant, HttpStatus.OK);
        }
    }

    @GetMapping("/by-name/{name}")
    @PreAuthorize("hasAuthority('everything:read entries')")
    public ResponseEntity<Restaurant> getById(@PathVariable String name) {
        Restaurant restaurant = restaurantService.findByName(name);
        if(restaurant == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(restaurant, HttpStatus.OK);
        }
    }

    @PostMapping
    @PreAuthorize("hasAuthority('everything:change entries')")
    public ResponseEntity<Restaurant> create(@RequestBody Restaurant restaurant) {
        Restaurant result = restaurantService.create(restaurant);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PutMapping
    @PreAuthorize("hasAuthority('everything:change entries')")
    public ResponseEntity<Restaurant> update(@RequestBody Restaurant restaurant) {
        Restaurant result = restaurantService.update(restaurant);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('everything:change entries')")
    public void delete(@PathVariable Long id) {
        restaurantService.delete(id);
    }
}
