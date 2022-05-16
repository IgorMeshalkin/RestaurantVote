package com.igormeshalkin.restaurant_vote.service;

import com.igormeshalkin.restaurant_vote.model.User;
import com.igormeshalkin.restaurant_vote.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
