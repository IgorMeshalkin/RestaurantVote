package com.igormeshalkin.restaurant_vote.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "votes")
@Data
public class Vote extends BaseEntity {

    @OneToOne(mappedBy = "vote")
    @JsonManagedReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    @JsonBackReference
    @JsonIgnore
    private Restaurant restaurant;
}
