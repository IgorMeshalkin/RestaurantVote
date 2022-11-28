package com.igormeshalkin.restaurant_vote;

import com.igormeshalkin.restaurant_vote.model.Vote;
import com.igormeshalkin.restaurant_vote.repository.VoteRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.List;

@SpringBootApplication
@EnableSwagger2
public class RestaurantVoteApplication {
    public static void main(String[] args) {
        SpringApplication.run(RestaurantVoteApplication.class, args);
    }
}
