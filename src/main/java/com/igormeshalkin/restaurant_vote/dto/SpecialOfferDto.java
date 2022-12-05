package com.igormeshalkin.restaurant_vote.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.igormeshalkin.restaurant_vote.model.SpecialOffer;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SpecialOfferDto {
    private Long id;
    private String name;
    private String description;
    private String photo;
    private RestaurantDto restaurant;

    public static SpecialOfferDto fromSpecialOffer(SpecialOffer specialOffer) {
        SpecialOfferDto specialOfferDto = new SpecialOfferDto();
        specialOfferDto.setId(specialOffer.getId());
        specialOfferDto.setName(specialOffer.getName());
        specialOfferDto.setDescription(specialOffer.getDescription());
        specialOfferDto.setPhoto(specialOffer.getPhoto());

        RestaurantDto restaurantDto = RestaurantDto.fromRestaurant(specialOffer.getRestaurant());
        specialOfferDto.setRestaurant(restaurantDto);

        return specialOfferDto;
    }
}
