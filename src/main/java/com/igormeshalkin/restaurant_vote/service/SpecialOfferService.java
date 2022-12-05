package com.igormeshalkin.restaurant_vote.service;

import com.igormeshalkin.restaurant_vote.model.SpecialOffer;
import com.igormeshalkin.restaurant_vote.model.User;
import com.igormeshalkin.restaurant_vote.repository.SpecialOfferRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class SpecialOfferService {
    private final SpecialOfferRepository specialOfferRepository;


    public SpecialOfferService(SpecialOfferRepository specialOfferRepository) {
        this.specialOfferRepository = specialOfferRepository;
    }

    public List<SpecialOffer> findAll() {
        List<SpecialOffer> result = specialOfferRepository.findAll();
        log.info("IN findAll - {} special offers found", result.size());
        return result;
    }
}
