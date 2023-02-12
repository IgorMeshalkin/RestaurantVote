package com.igormeshalkin.restaurant_vote.repository;

import com.igormeshalkin.restaurant_vote.model.Photo;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhotoRepository extends JpaRepository<Photo, Long> {
}
