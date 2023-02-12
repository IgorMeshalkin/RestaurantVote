package com.igormeshalkin.restaurant_vote.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(name="phone_number")
    private String phoneNumber;

    @Column(name="lunch_time")
    private String lunchTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "cuisine")
    private СuisineType cuisine;

    @Column(name = "price")
    private Double price;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    @JsonIgnore
    private List<Meal> menu;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    @JsonIgnore
    private List<Photo> photos;

    @OneToMany(mappedBy = "restaurant", fetch = FetchType.LAZY)
    @JsonManagedReference
    @JsonIgnore
    private List<Vote> votes;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    @JsonIgnore
    private List<Comment> comments;

    @OneToMany(mappedBy = "restaurant", fetch = FetchType.LAZY)
    @Fetch(value = FetchMode.SUBSELECT)
    @JsonManagedReference
    @JsonIgnore
    private List<SpecialOffer> specialOffer;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    @JsonIgnore
    private User user;

    @Override
    public String toString() {
        return "RestaurantPage{" +
                "id='" + getId() + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", price='" + price + '\'' +
                ", phone='" + phoneNumber + '\'' +
                '}';
    }
}
