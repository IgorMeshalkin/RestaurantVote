package com.igormeshalkin.restaurant_vote.rest;


import com.igormeshalkin.restaurant_vote.dto.MealDto;
import com.igormeshalkin.restaurant_vote.dto.PhotoDTO;
import com.igormeshalkin.restaurant_vote.model.Meal;
import com.igormeshalkin.restaurant_vote.model.Photo;
import com.igormeshalkin.restaurant_vote.model.Restaurant;
import com.igormeshalkin.restaurant_vote.service.PhotoService;
import com.igormeshalkin.restaurant_vote.service.RestaurantService;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/photos")
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
public class PhotoRestController {
    private final PhotoService photoService;
    private final RestaurantService restaurantService;

    public PhotoRestController(PhotoService photoService, RestaurantService restaurantService) {
        this.photoService = photoService;
        this.restaurantService = restaurantService;
    }

    @PostMapping("/{restaurant_id}")
    @PreAuthorize("hasAuthority('everything:change entries')")
    @ApiOperation("Create new photo")
    public ResponseEntity<PhotoDTO> createAndAddToRestaurantMenu(@RequestBody Photo photo,
                                                                 @PathVariable Long restaurant_id) {
        Restaurant restaurant = restaurantService.findById(restaurant_id);
        if (restaurant == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            PhotoDTO result = PhotoDTO.fromPhoto(photoService.create(photo, restaurant));
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('everything:change entries')")
    @ApiOperation("Delete photo")
    public void delete(@PathVariable Long id) {
        photoService.delete(id);
    }
}
