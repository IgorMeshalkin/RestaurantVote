package com.igormeshalkin.restaurant_vote.repository;

import com.igormeshalkin.restaurant_vote.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote, Long> {
}
