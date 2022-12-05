package com.igormeshalkin.restaurant_vote.rest;

import com.igormeshalkin.restaurant_vote.dto.RestaurantDto;
import com.igormeshalkin.restaurant_vote.model.Restaurant;
import com.igormeshalkin.restaurant_vote.model.СuisineType;
import com.igormeshalkin.restaurant_vote.service.RestaurantService;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600, exposedHeaders = "x-total-count")
public class RestaurantRestController {
    private final RestaurantService restaurantService;

    public RestaurantRestController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('everything:read entries')")
    @ApiOperation("Get all restaurants")
    public ResponseEntity<List<RestaurantDto>> getAll(@RequestParam int limit,
                                                      @RequestParam int page,
                                                      @RequestParam (required = false, defaultValue = "") String sort,
                                                      @RequestParam (required = false, defaultValue = "") String searchQuery,
                                                      @RequestParam (required = false, defaultValue = "ALL") String cuisine,
                                                      HttpServletResponse response) {
        Pageable pageable;
        if (sort.equals("firstExpensive")) {
            pageable = PageRequest.of(page, limit, Sort.by("price").descending());
        } else if (sort.equals("firstCheap")) {
            pageable = PageRequest.of(page, limit, Sort.by("price"));
        } else {
            pageable = PageRequest.of(page, limit);
        }

        СuisineType cuisineType = cuisine.equals("ALL") ? null : СuisineType.valueOf(cuisine);

        Page<Restaurant> restaurantsPage = restaurantService.findAll(searchQuery, cuisineType, pageable);

        List<RestaurantDto> result = restaurantsPage.getContent().stream()
                .map(RestaurantDto::fromRestaurant)
                .collect(Collectors.toList());
        response.addHeader("x-total-count", String.valueOf(restaurantsPage.getTotalElements()));

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('everything:read entries')")
    @ApiOperation("Get restaurant by id")
    public ResponseEntity<RestaurantDto> getById(@PathVariable Long id) {
        System.out.println(id);
        Restaurant restaurant = restaurantService.findById(id);
        if (restaurant == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            RestaurantDto result = RestaurantDto.fromRestaurant(restaurant);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

//    @GetMapping("/{name}")
//    @PreAuthorize("hasAuthority('everything:read entries')")
//    @ApiOperation("Get restaurant by name")
//    public ResponseEntity<RestaurantDto> getByName(@PathVariable String name) {
//        Restaurant restaurant = restaurantService.findByName(name);
//        if (restaurant == null) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        } else {
//            RestaurantDto result = RestaurantDto.fromRestaurant(restaurant);
//            return new ResponseEntity<>(result, HttpStatus.OK);
//        }
//    }

    @PostMapping
    @PreAuthorize("hasAuthority('everything:change entries')")
    @ApiOperation("Create new restaurant")
    public ResponseEntity<Restaurant> create(@RequestBody Restaurant restaurant) {
        Restaurant result = restaurantService.create(restaurant);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PutMapping
    @PreAuthorize("hasAuthority('everything:change entries')")
    @ApiOperation("Update restaurant")
    public ResponseEntity<Restaurant> update(@RequestBody Restaurant restaurant) {
        Restaurant result = restaurantService.update(restaurant);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('everything:change entries')")
    @ApiOperation("Delete restaurant")
    public void delete(@PathVariable Long id) {
        restaurantService.delete(id);
    }
}
