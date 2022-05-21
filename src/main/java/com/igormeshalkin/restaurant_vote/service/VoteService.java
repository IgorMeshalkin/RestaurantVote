package com.igormeshalkin.restaurant_vote.service;

import com.igormeshalkin.restaurant_vote.model.Restaurant;
import com.igormeshalkin.restaurant_vote.model.Role;
import com.igormeshalkin.restaurant_vote.model.User;
import com.igormeshalkin.restaurant_vote.model.Vote;
import com.igormeshalkin.restaurant_vote.repository.UserRepository;
import com.igormeshalkin.restaurant_vote.repository.VoteRepository;
import com.igormeshalkin.restaurant_vote.util.SecurityUtil;
import com.igormeshalkin.restaurant_vote.util.TimeZoneUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
@Slf4j
public class VoteService {
    private final VoteRepository voteRepository;
    private final UserRepository userRepository;

    public VoteService(VoteRepository voteRepository, UserRepository userRepository) {
        this.voteRepository = voteRepository;
        this.userRepository = userRepository;
    }

    public Vote create(Restaurant restaurant) {
        Vote vote = new Vote();
        User currentUser = SecurityUtil.getCurrentUser();

        vote.setUser(currentUser);
        vote.setRestaurant(restaurant);

        LocalDateTime dateTime = LocalDateTime.now(TimeZoneUtil.SERVER_ZONE_ID);
        vote.setCreated(dateTime);
        vote.setUpdated(dateTime);

        Vote result = voteRepository.save(vote);
        currentUser.setVote(result);
        userRepository.save(currentUser);
        log.info("IN create - User {} successfully voted for a restaurant: \"{}\". Vote id: \"{}\".", currentUser, restaurant.getName(), result.getId());
        return result;
    }

    public Vote update(Restaurant restaurant) {
        User currentUser = SecurityUtil.getCurrentUser();
        Vote vote = currentUser.getVote();

        LocalTime controlTime = LocalTime.parse("11:00:00");
        LocalTime currentTime = LocalTime.now();

        if (controlTime.compareTo(currentTime) >= 0) {
            vote.setRestaurant(restaurant);
            LocalDateTime dateTime = LocalDateTime.now(TimeZoneUtil.SERVER_ZONE_ID);
            vote.setUpdated(dateTime);
            Vote result = voteRepository.save(vote);
            currentUser.setVote(result);
            userRepository.save(currentUser);
            log.info("IN create - User {} successfully voted for the restaurant: \"{}\". Vote id: \"{}\".", currentUser, restaurant.getName(), result.getId());
            return result;
        } else {
            log.warn("IN update - prevented an attempt to change the vote after the time limit of 11:00:00");
            return vote;
        }
    }

    public void delete(Long id) {
        User currentUser = SecurityUtil.getCurrentUser();
        Vote vote = voteRepository.findById(id).orElse(null);
        if (vote != null) {
            if (vote.getUser().equals(currentUser) || currentUser.getRole().equals(Role.ADMIN)) {
                currentUser.setVote(null);
                userRepository.save(currentUser);
                voteRepository.deleteById(id);
                log.info("IN delete - vote with id: \"{}\" successfully deleted", id);
            }
        }
    }
}
