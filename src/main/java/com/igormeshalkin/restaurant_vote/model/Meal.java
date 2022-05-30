package com.igormeshalkin.restaurant_vote.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @Column(name = "price")
    private double price;

    @ManyToOne()
    @JoinColumn(name = "restaurant_id")
    @JsonBackReference
    private Restaurant restaurant;

    //constructor for the tests
    public Meal(Long id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
