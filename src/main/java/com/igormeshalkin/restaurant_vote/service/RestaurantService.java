package com.igormeshalkin.restaurant_vote.service;

import com.igormeshalkin.restaurant_vote.model.Restaurant;
import com.igormeshalkin.restaurant_vote.repository.RestaurantRepository;
import com.igormeshalkin.restaurant_vote.util.TimeUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;

    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public List<Restaurant> findAll() {
        List<Restaurant> result = restaurantRepository.findAll();
        log.info("IN findAll - {} restaurants found", result.size());
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

        Restaurant result = restaurantRepository.save(restaurant);
        log.info("IN create - restaurant: {} successfully created", result);
        return result;
    }

    public Restaurant update(Restaurant restaurant) {
        Restaurant restaurantFromDb = restaurantRepository.findById(restaurant.getId()).orElse(null);
        if (restaurantFromDb == null) {
            log.info("IN update - restaurant with id \"{}\" not found for update)", restaurant.getId());
            return restaurant;
        }

        LocalDateTime dateTime = LocalDateTime.now(TimeUtil.SERVER_ZONE_ID);
        restaurant.setCreated(restaurantFromDb.getCreated());
        restaurant.setUpdated(dateTime);

        Restaurant result = restaurantRepository.save(restaurant);
        log.info("IN update - restaurant: {} successfully updated", result);
        return result;
    }

    public void delete(Long id) {
        restaurantRepository.deleteById(id);
        log.info("IN delete - restaurant with id: \"{}\" successfully deleted", id);
    }
}
