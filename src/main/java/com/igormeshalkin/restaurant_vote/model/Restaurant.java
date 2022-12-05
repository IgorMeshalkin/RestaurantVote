package com.igormeshalkin.restaurant_vote.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "restaurants")
@Data
@NoArgsConstructor
public class Restaurant extends BaseEntity {
    @Column(name = "name")
    private String name;

    @Column(name="address")
    private String address;

    @Column(name="lunch_time")
    private String lunchTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "cuisine")
    private СuisineType cuisine;

    @Column(name = "price")
    private Double price;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Meal> menu;

    @OneToMany(mappedBy = "restaurant", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Vote> votes;

    @OneToMany(mappedBy = "restaurant", fetch = FetchType.LAZY)
    @Fetch(value = FetchMode.SUBSELECT)
    @JsonManagedReference
    private List<SpecialOffer> specialOffer;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

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
                ", address='" + address + '\'' +
                ", price='" + price + '\'' +
                '}';
    }
}
