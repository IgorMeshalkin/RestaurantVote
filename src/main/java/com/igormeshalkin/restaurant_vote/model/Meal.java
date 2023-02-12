package com.igormeshalkin.restaurant_vote.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "meals")
@Data
@NoArgsConstructor
public class Meal extends BaseEntity {
    @Column(name = "name")
    private String name;
    @Column(name = "weight")
    private int weight;

    @ManyToOne()
    @JoinColumn(name = "restaurant_id")
    @JsonBackReference
    @JsonIgnore
    private Restaurant restaurant;
}
