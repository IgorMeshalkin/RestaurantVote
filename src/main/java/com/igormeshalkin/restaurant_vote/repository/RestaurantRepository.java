package com.igormeshalkin.restaurant_vote.repository;

import com.igormeshalkin.restaurant_vote.model.Restaurant;
import com.igormeshalkin.restaurant_vote.model.СuisineType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RestaurantRepository extends PagingAndSortingRepository<Restaurant, Long> {
    Optional<Restaurant> findByName(String name);

    @Query("SELECT rest FROM Restaurant rest " +
            "WHERE (rest.name LIKE concat('%', :searchQuery, '%') OR rest.address LIKE concat('%', :searchQuery, '%')) " +
            "AND (rest.cuisine = :cuisine or :cuisine is null)")
    Page<Restaurant> findAllPagingAndSorting(@Param("searchQuery") String searchQuery,
                                             @Param("cuisine") СuisineType cuisine,
                                             Pageable pageable);

    @Query("SELECT rest FROM Restaurant rest LEFT JOIN rest.votes vote " +
            "WHERE (rest.name LIKE concat('%', :searchQuery, '%') OR rest.address LIKE concat('%', :searchQuery, '%')) " +
            "AND (rest.cuisine = :cuisine or :cuisine is null) " +
            "GROUP BY rest.id ORDER BY COUNT(vote.id) DESC")
    Page<Restaurant> findAllPagingAndSortingByRating(@Param("searchQuery") String searchQuery,
                                                     @Param("cuisine") СuisineType cuisine,
                                                     Pageable pageable);
}