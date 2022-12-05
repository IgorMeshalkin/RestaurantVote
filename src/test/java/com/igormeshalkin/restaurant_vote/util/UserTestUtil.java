//package com.igormeshalkin.restaurant_vote.util;
//
//import com.igormeshalkin.restaurant_vote.dto.UserDto;
//import com.igormeshalkin.restaurant_vote.model.Role;
//import com.igormeshalkin.restaurant_vote.model.User;
//
//import java.util.ArrayList;
//import java.util.List;
//
//public class UserTestUtil {
//    private static final UserDto userDto1 = new UserDto(1L, "admin", "Игорь", "Мешалкин", Role.ADMIN, true);
//    private static final UserDto userDto2 = new UserDto(2L, "ivan", "Иван", "Иванов", Role.USER, true);
//    private static final UserDto userDto3 = new UserDto(3L, "petr", "Петр", "Петров", Role.USER, true);
//    private static final User userForCreate = new User(4L, "sergey", "$2a$12$QHO71KmefD75fNCnk44QCuVvkLFyorgN87oSD91Zt2Bzge19EXrlW", "Сергей", "Сергеев", Role.USER, true);
//    private static final User userForUpdate = new User(2L, "ivan", "$2a$12$2vOTh3/CyvRgC1xDRg2/2.C0.pxzuwEgD0K91.cTQ1wIkmeowNuWu", "Иван", "Сергеев", Role.USER, true);
//    private static final User userForUpdateWithRole = new User(3L, "petr", "$2a$12$GQtd9rEuqiWk6BcgM7T3cOCGPVV0jbW7RqLojAjt9onsDe1PHmPFO", "Петр", "Петров", Role.ADMIN, true);
//
//    public static List<UserDto> getUserDtoList() {
//        List<UserDto> result = new ArrayList<>();
//        result.add(userDto1);
//        result.add(userDto2);
//        result.add(userDto3);
//        return result;
//    }
//
//    public static User getUserForCreate() {
//        return userForCreate;
//    }
//
//    public static User getUserForUpdate() {
//        return userForUpdate;
//    }
//
//    public static User getUserForUpdateWithRole() {
//        return userForUpdateWithRole;
//    }
//
//}
