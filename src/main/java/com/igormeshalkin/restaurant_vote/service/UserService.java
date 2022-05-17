package com.igormeshalkin.restaurant_vote.service;

import com.igormeshalkin.restaurant_vote.model.User;

import java.util.List;

public interface UserService {

    public List<User> findAll();

    public User findById(Long id);

    public User findByUsername(String username);

    public User create(User user);

    User update(User updatedUser, User currentUser);

    public void delete(Long id);
}
