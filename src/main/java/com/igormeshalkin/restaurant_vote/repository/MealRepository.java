package com.igormeshalkin.restaurant_vote.repository;

import com.igormeshalkin.restaurant_vote.model.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealRepository extends JpaRepository<Meal, Long> {
}
