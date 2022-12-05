package com.igormeshalkin.restaurant_vote.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "special_offers")
@Data
public class SpecialOffer extends BaseEntity {
    @Column(name="photo")
    private String photo;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    @JsonBackReference
    private Restaurant restaurant;

    @Override
    public String toString() {
        return "SpecialOffer{" +
                "photo='" + photo + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", restaurant=" + restaurant +
                '}';
    }
}
