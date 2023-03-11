package com.igormeshalkin.restaurant_vote.service;

import com.igormeshalkin.restaurant_vote.model.Restaurant;
import com.igormeshalkin.restaurant_vote.model.Role;
import com.igormeshalkin.restaurant_vote.model.User;
import com.igormeshalkin.restaurant_vote.model.СuisineType;
import com.igormeshalkin.restaurant_vote.repository.RestaurantRepository;
import com.igormeshalkin.restaurant_vote.util.SecurityUtil;
import com.igormeshalkin.restaurant_vote.util.TimeUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Slf4j
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;

    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }


    public Page<Restaurant> findAll(String searchQuery, СuisineType cuisine, Pageable pageable) {
        Page<Restaurant> result = null;
        if (pageable.getSort().isUnsorted()) {
                result = restaurantRepository.findAllPagingAndSortingByRating(searchQuery, cuisine, pageable);
        } else {
                result = restaurantRepository.findAllPagingAndSorting(searchQuery, cuisine, pageable);
        }

        log.info("IN findAll - {} restaurants found", result.getContent().size());

        return result;
    }

    public Restaurant findById(Long id) {
        Optional<Restaurant> optional = restaurantRepository.findById(id);
        if (optional.isPresent()) {
            Restaurant result = optional.get();
            log.info("IN findById - restaurant: {} found by id: \"{}\"", result, id);
            return result;
        } else {
            log.warn("IN findById - restaurant with id: \"{}\" not found", id);
            return null;
        }
    }

    public Restaurant findByName(String name) {
        Optional<Restaurant> optional = restaurantRepository.findByName(name);
        if (optional.isPresent()) {
            Restaurant result = optional.get();
            log.info("IN findByName - restaurant: {} found by name: \"{}\"", result, name);
            return result;
        } else {
            log.warn("IN findByName - restaurant with name: \"{}\" not found", name);
            return null;
        }
    }

    public Restaurant create(Restaurant restaurant) {
        LocalDateTime dateTime = LocalDateTime.now(TimeUtil.SERVER_ZONE_ID);
        restaurant.setCreated(dateTime);
        restaurant.setUpdated(dateTime);
        restaurant.setUser(SecurityUtil.getCurrentUser());

        Restaurant result = restaurantRepository.save(restaurant);
        log.info("IN create - restaurant: {} successfully created", result);
        return result;
    }

    public Restaurant update(Restaurant restaurant) {
        Restaurant restaurantFromDb = restaurantRepository.findById(restaurant.getId()).orElse(null);
        User currentUser = SecurityUtil.getCurrentUser();

        if (restaurantFromDb == null) {
            log.info("IN update - restaurant with id \"{}\" not found for update)", restaurant.getId());
            return restaurant;
        } else if ((!restaurantFromDb.getUser().getId().equals(currentUser.getId()))
        && !currentUser.getRole().equals(Role.ADMIN)) {
            log.info("IN update - trying to change someone else's restaurant with id \"{}\")", restaurant.getId());
            return null;
        }

        LocalDateTime dateTime = LocalDateTime.now(TimeUtil.SERVER_ZONE_ID);
        restaurant.setCreated(restaurantFromDb.getCreated());
        restaurant.setUpdated(dateTime);
        restaurant.setUser(restaurantFromDb.getUser());

        Restaurant result = restaurantRepository.save(restaurant);
        log.info("IN update - restaurant: {} successfully updated", result);
        return result;
    }

    public String delete(Long id) {
        Restaurant restaurantFromDb = restaurantRepository.findById(id).orElse(null);
        User currentUser = SecurityUtil.getCurrentUser();

        if (restaurantFromDb == null) {
            log.info("IN delete - restaurant with id \"{}\" not found for update)", id);
            return "NOT FOUND";
        } else if ((!restaurantFromDb.getUser().getId().equals(currentUser.getId()))
                && !currentUser.getRole().equals(Role.ADMIN)) {
            log.info("IN delete - trying to delete someone else's restaurant with id \"{}\")", id);
            return "FORBIDDEN";
        }

        restaurantRepository.deleteById(id);
        log.info("IN delete - restaurant with id: \"{}\" successfully deleted", id);
        return "OK";
    }
}
