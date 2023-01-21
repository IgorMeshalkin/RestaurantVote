package com.igormeshalkin.restaurant_vote.service;

import com.igormeshalkin.restaurant_vote.model.Role;
import com.igormeshalkin.restaurant_vote.model.User;
import com.igormeshalkin.restaurant_vote.repository.UserRepository;
import com.igormeshalkin.restaurant_vote.util.SecurityUtil;
import com.igormeshalkin.restaurant_vote.util.TimeUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAll() {
        List<User> result = userRepository.findAll();
        log.info("IN findAll - {} users found", result.size());
        return result;
    }

    public User findById(Long id) {
        Optional<User> result = userRepository.findById(id);
        if (result.isPresent()) {
            User user = result.get();
            log.info("IN findById - user: {} found by id: \"{}\"", user, id);
            return user;
        } else {
            log.warn("IN findById - user with id: \"{}\" not found", id);
            return null;
        }
    }

    public User findByUsername(String username) {
        Optional<User> result = userRepository.findByUsername(username);
        if (result.isPresent()) {
            User user = result.get();
            log.info("IN findByUsername - user: {} found by username: \"{}\"", user, username);
            return user;
        } else {
            log.warn("IN findByUsername - user with username: \"{}\" not found", username);
            return null;
        }
    }

    public User create(User user) {
        user.setPassword(passwordEncoderFromUserService().encode(user.getPassword()));
        user.setRole(Role.USER);
        user.setActive(true);

        LocalDateTime dateTime = LocalDateTime.now(TimeUtil.SERVER_ZONE_ID);
        user.setCreated(dateTime);
        user.setUpdated(dateTime);

        User result = userRepository.save(user);
        log.info("IN create - user: {} successfully created", result);
        return result;
    }

    public User update(User updatedUser) {
        User currentUser = SecurityUtil.getCurrentUser();
        User userFromDb = userRepository.findById(updatedUser.getId()).orElse(null);
        if (userFromDb == null) {
            log.info("IN update - user with id \"{}\" not found for update)", updatedUser.getId());
            return updatedUser;
        }

        if (!userFromDb.getRole().equals(updatedUser.getRole()) || userFromDb.isActive() != updatedUser.isActive()) {
            if (!currentUser.getRole().equals(Role.ADMIN)) {
                updatedUser.setRole(userFromDb.getRole());
                updatedUser.setActive(userFromDb.isActive());
                log.warn("IN update - prevented attempt to change role or activity of user: {}", userFromDb);
            }
        }

        if (updatedUser.getPassword() == null) {
            updatedUser.setPassword(userFromDb.getPassword());
        } else if (!userFromDb.getPassword().equals(updatedUser.getPassword())) {
            updatedUser.setPassword(passwordEncoderFromUserService().encode(updatedUser.getPassword()));
        }

        LocalDateTime dateTime = LocalDateTime.now(TimeUtil.SERVER_ZONE_ID);
        updatedUser.setUpdated(dateTime);
        updatedUser.setCreated(userFromDb.getCreated());

        User result = userRepository.save(updatedUser);
        log.info("IN update - user: {} successfully updated", result);
        return result;
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
        log.info("IN delete - user with id: \"{}\" successfully deleted", id);
    }

    public boolean checkForUserNameDuplicate(User user) {
        int result =  userRepository.checkForUserNameDuplicate(user.getUsername());
        return result != 0;
    }

    @Bean
    protected PasswordEncoder passwordEncoderFromUserService() {
        return new BCryptPasswordEncoder();
    }
}
