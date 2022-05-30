package com.igormeshalkin.restaurant_vote.rest;

import com.igormeshalkin.restaurant_vote.dto.RestaurantDto;
import com.igormeshalkin.restaurant_vote.model.Restaurant;
import com.igormeshalkin.restaurant_vote.service.RestaurantService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantRestController {
    private final RestaurantService restaurantService;

    public RestaurantRestController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('everything:read entries')")
    public ResponseEntity<List<RestaurantDto>> getAll() {
        List<RestaurantDto> result = restaurantService.findAll().stream()
                .map(RestaurantDto::fromRestaurant)
                .collect(Collectors.toList());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/by-id/{id}")
    @PreAuthorize("hasAuthority('everything:read entries')")
    public ResponseEntity<RestaurantDto> getById(@PathVariable Long id) {
        Restaurant restaurant = restaurantService.findById(id);
        if (restaurant == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            RestaurantDto result = RestaurantDto.fromRestaurant(restaurant);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    @GetMapping("/by-name/{name}")
    @PreAuthorize("hasAuthority('everything:read entries')")
    public ResponseEntity<RestaurantDto> getByName(@PathVariable String name) {
        Restaurant restaurant = restaurantService.findByName(name);
        if (restaurant == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            RestaurantDto result = RestaurantDto.fromRestaurant(restaurant);
            return new ResponseEntity<>(result, HttpStatus.OK);
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
