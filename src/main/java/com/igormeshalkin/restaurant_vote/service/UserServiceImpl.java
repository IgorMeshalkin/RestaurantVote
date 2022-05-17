package com.igormeshalkin.restaurant_vote.service;

import com.igormeshalkin.restaurant_vote.model.Role;
import com.igormeshalkin.restaurant_vote.model.User;
import com.igormeshalkin.restaurant_vote.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final ZoneId ZONE_ID = ZoneId.of("+10:00");

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> findAll() {
        List<User> result = userRepository.findAll();
        log.info("IN findAll - {} users found", result.size());
        return result;
    }

    @Override
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

    @Override
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

    @Override
    public User create(User user) {
        user.setPassword(passwordEncoderFromUserService().encode(user.getPassword()));
        user.setRole(Role.USER);
        user.setActive(true);

        LocalDateTime dateTime = LocalDateTime.now(ZONE_ID);
        user.setCreated(dateTime);
        user.setUpdated(dateTime);

        User result = userRepository.save(user);
        log.info("IN create - user: {} successfully created", result);
        return result;
    }

    @Override
    public User update(User updatedUser, User currentUser) {
        User userFromDb = userRepository.findById(updatedUser.getId()).orElse(null);
        if (userFromDb == null) {
            return updatedUser;
        }

        if (!userFromDb.getRole().equals(updatedUser.getRole()) || userFromDb.isActive() != updatedUser.isActive()) {
                if (!currentUser.getRole().equals(Role.ADMIN)) {
                    updatedUser.setRole(userFromDb.getRole());
                    updatedUser.setActive(userFromDb.isActive());
                    log.warn("IN update - prevented attempt to change role or activity of user: {}", userFromDb);
                }
        }

        if (!userFromDb.getPassword().equals(updatedUser.getPassword())) {
            updatedUser.setPassword(passwordEncoderFromUserService().encode(updatedUser.getPassword()));
        }

        LocalDateTime dateTime = LocalDateTime.now(ZONE_ID);
        updatedUser.setUpdated(dateTime);

        User result = userRepository.save(updatedUser);
        log.info("IN update - user: {} successfully updated", result);
        return result;
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
        log.info("IN delete - user with id: {} successfully deleted", id);
    }

    @Bean
    protected PasswordEncoder passwordEncoderFromUserService() {
        return new BCryptPasswordEncoder();
    }
}
