package com.igormeshalkin.restaurant_vote.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.igormeshalkin.restaurant_vote.model.Comment;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CommentDto {
    private Long id;
    private Long authorsId;
    private String author;
    private String body;
    private LocalDateTime lastUpdated;

    public static CommentDto fromComment(Comment comment) {
        CommentDto commentDto = new CommentDto();
        commentDto.setId(comment.getId());
        commentDto.setAuthorsId(comment.getAuthor().getId());
        commentDto.setAuthor(comment.getAuthor().getFirstName() + " " + comment.getAuthor().getLastName());
        commentDto.setBody(comment.getBody());
        commentDto.setLastUpdated(comment.getUpdated());
        return commentDto;
    }
}
