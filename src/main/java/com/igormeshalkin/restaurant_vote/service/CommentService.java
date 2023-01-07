package com.igormeshalkin.restaurant_vote.service;

import com.igormeshalkin.restaurant_vote.model.Comment;
import com.igormeshalkin.restaurant_vote.repository.CommentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Page<Comment> findAll(Long restaurant_id, Pageable pageable) {
        Page<Comment> result = commentRepository.findAllByRestaurantId(restaurant_id, pageable);
        log.info("IN findAll - {} comments found", result.getContent().size());
        return result;
    }
}
