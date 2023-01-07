package com.igormeshalkin.restaurant_vote.rest;

import com.igormeshalkin.restaurant_vote.dto.CommentDto;
import com.igormeshalkin.restaurant_vote.model.Comment;
import com.igormeshalkin.restaurant_vote.service.CommentService;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600, exposedHeaders = "x-total-count")
public class CommentRestController {
    private final CommentService commentService;

    public CommentRestController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/{restaurant_id}")
    @PreAuthorize("hasAuthority('everything:read entries')")
    @ApiOperation("Get comments by restaurant_id")
    public ResponseEntity<List<CommentDto>> getById(@PathVariable Long restaurant_id,
                                                    @RequestParam int limit,
                                                    @RequestParam int page,
                                                    HttpServletResponse response) {
        Pageable pageable = PageRequest.of(page, limit);
        Page<Comment> commentPage = commentService.findAll(restaurant_id, pageable);
        List<CommentDto> result = commentPage.getContent().stream()
                .map(CommentDto::fromComment)
                .collect(Collectors.toList());

        response.addHeader("x-total-count", String.valueOf(commentPage.getTotalElements()));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
