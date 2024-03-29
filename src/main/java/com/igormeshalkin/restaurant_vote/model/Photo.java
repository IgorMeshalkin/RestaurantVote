package com.igormeshalkin.restaurant_vote.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "photos")
@Data
@NoArgsConstructor
public class Photo extends BaseEntity{
    @Column(name = "url")
    private String url;

    @ManyToOne()
    @JoinColumn(name = "restaurant_id")
    @JsonBackReference
    @JsonIgnore
    private Restaurant restaurant;
}
