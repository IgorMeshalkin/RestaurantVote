package com.igormeshalkin.restaurant_vote.service;

import com.igormeshalkin.restaurant_vote.model.Meal;
import com.igormeshalkin.restaurant_vote.model.Photo;
import com.igormeshalkin.restaurant_vote.model.Restaurant;
import com.igormeshalkin.restaurant_vote.repository.PhotoRepository;
import com.igormeshalkin.restaurant_vote.util.TimeUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Slf4j
public class PhotoService {
    private final PhotoRepository photoRepository;

    public PhotoService(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    public Photo create(Photo photo, Restaurant restaurant) {
        LocalDateTime dateTime = LocalDateTime.now(TimeUtil.SERVER_ZONE_ID);
        photo.setCreated(dateTime);
        photo.setUpdated(dateTime);

        photo.setRestaurant(restaurant);
        Photo result = photoRepository.save(photo);
        log.info("IN create - photo: {} successfully created", result);
        return result;
    }

    public void delete(Long id) {
        photoRepository.deleteById(id);
        log.info("IN delete - photo with id: \"{}\" successfully deleted", id);
    }
}
