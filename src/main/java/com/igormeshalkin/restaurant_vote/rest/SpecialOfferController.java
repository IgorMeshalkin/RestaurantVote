package com.igormeshalkin.restaurant_vote.rest;

import com.igormeshalkin.restaurant_vote.dto.SpecialOfferDto;
import com.igormeshalkin.restaurant_vote.model.SpecialOffer;
import com.igormeshalkin.restaurant_vote.service.SpecialOfferService;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/special_offers")
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600, exposedHeaders = "x-total-count")
public class SpecialOfferController {
    private final SpecialOfferService specialOfferService;

    public SpecialOfferController(SpecialOfferService specialOfferService) {
        this.specialOfferService = specialOfferService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('everything:read entries')")
    @ApiOperation("Get all special offers")
    public ResponseEntity<List<SpecialOfferDto>> getAll() {
        List<SpecialOffer> response = specialOfferService.findAll();

        List<SpecialOfferDto> result = response.stream()
                .map(SpecialOfferDto::fromSpecialOffer)
                .collect(Collectors.toList());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
