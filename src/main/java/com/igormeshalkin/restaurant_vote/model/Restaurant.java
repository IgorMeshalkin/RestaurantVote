package com.igormeshalkin.restaurant_vote.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "restaurants")
@Data
@NoArgsConstructor
public class Restaurant extends BaseEntity {
    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Meal> menu;

    @OneToMany(mappedBy = "restaurant", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Vote> votes;

    //constructor for the tests
    public Restaurant(Long id, String name, List list) {
        this.id = id;
        this.name = name;
        this.votes = list;
    }

    @Override
    public String toString() {
        return "Restaurant{" +
                "id='" + getId() + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
