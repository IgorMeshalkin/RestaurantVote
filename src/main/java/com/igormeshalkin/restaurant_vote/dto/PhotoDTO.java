package com.igormeshalkin.restaurant_vote.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.igormeshalkin.restaurant_vote.model.Photo;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PhotoDTO {
    private Long id;
    private String url;

    public static PhotoDTO fromPhoto(Photo photo) {
        PhotoDTO photoDTO = new PhotoDTO();
        photoDTO.setId(photo.getId());
        photoDTO.setUrl(photo.getUrl());
        return photoDTO;
    }
}
