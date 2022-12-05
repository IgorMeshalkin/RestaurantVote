package com.igormeshalkin.restaurant_vote.repository;

import com.igormeshalkin.restaurant_vote.model.SpecialOffer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecialOfferRepository extends JpaRepository<SpecialOffer, Long> {
}
