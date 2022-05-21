package com.igormeshalkin.restaurant_vote.rest;

import com.igormeshalkin.restaurant_vote.model.Restaurant;
import com.igormeshalkin.restaurant_vote.model.Vote;
import com.igormeshalkin.restaurant_vote.service.RestaurantService;
import com.igormeshalkin.restaurant_vote.service.VoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/votes")
public class VoteRestController {
    private final VoteService voteService;
    private final RestaurantService restaurantService;

    public VoteRestController(VoteService voteService, RestaurantService restaurantService) {
        this.voteService = voteService;
        this.restaurantService = restaurantService;
    }

    @PostMapping("/{restaurant_id}")
    @PreAuthorize("hasAuthority('users:vote')")
    public ResponseEntity<Vote> voteForTheRestaurant(@PathVariable Long restaurant_id) {
        Restaurant restaurant = restaurantService.findById(restaurant_id);
        if(restaurant == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            Vote result = voteService.create(restaurant);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    @PutMapping("/{restaurant_id}")
    @PreAuthorize("hasAuthority('users:vote')")
    public ResponseEntity<Vote> update(@PathVariable Long restaurant_id) {
        Restaurant restaurant = restaurantService.findById(restaurant_id);
        if(restaurant == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            Vote result = voteService.update(restaurant);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('users:vote')")
    public void delete(@PathVariable Long id) {
        voteService.delete(id);
    }
}
