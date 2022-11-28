//package com.igormeshalkin.restaurant_vote.util;
//
//import com.igormeshalkin.restaurant_vote.dto.RestaurantDto;
//import com.igormeshalkin.restaurant_vote.model.Meal;
//import com.igormeshalkin.restaurant_vote.model.Restaurant;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.stream.Collectors;
//
//public class RestaurantAndMealTestUtil {
//    private static final Restaurant restaurant1 = new Restaurant(1L, "Subway", new ArrayList<>());
//    private static final Restaurant restaurant2 = new Restaurant(2L, "Starbucks", new ArrayList<>());
//    private static final Restaurant restaurant3 = new Restaurant(3L, "KFC", new ArrayList<>());
//    private static final Restaurant restaurantForCreate = new Restaurant(4L, "McDonald's", new ArrayList<>());
//    private static final Restaurant restaurantForUpdate = new Restaurant(3L, "McDonald's", new ArrayList<>());
//
////    private static final Meal meal1 = new Meal(1L, "Сендвич", 125.5);
////    private static final Meal meal2 = new Meal(2L, "Чай", 60);
////    private static final Meal meal3 = new Meal(3L, "Чизкейк", 153.7);
////    private static final Meal meal4 = new Meal(4L, "Кофе", 110.3);
////    private static final Meal meal5 = new Meal(5L, "Чизбургер", 170.55);
////    private static final Meal meal6 = new Meal(6L, "Кола", 93.6);
////    private static final Meal mealForCreate = new Meal(7L, "Гамбургер", 162.8);
////    private static final Meal mealForUpdate = new Meal(5L, "Чизбургер", 180.56);
//
//    public static List<Meal> getFirstMenu() {
//        List<Meal> menu = new ArrayList<>();
//        menu.add(meal1);
//        menu.add(meal2);
//        return menu;
//    }
//
//    public static List<Meal> getSecondMenu() {
//        List<Meal> menu = new ArrayList<>();
//        menu.add(meal3);
//        menu.add(meal4);
//        return menu;
//    }
//
//    public static List<Meal> getThirdMenu() {
//        List<Meal> menu = new ArrayList<>();
//        menu.add(meal5);
//        menu.add(meal6);
//        return menu;
//    }
//
//    public static List<RestaurantDto> getRestaurantDtoList() {
//        restaurant1.setMenu(getFirstMenu());
//        restaurant2.setMenu(getSecondMenu());
//        restaurant3.setMenu(getThirdMenu());
//
//        List<Restaurant> restaurantList = new ArrayList<>();
//        restaurantList.add(restaurant1);
//        restaurantList.add(restaurant2);
//        restaurantList.add(restaurant3);
//        return restaurantList.stream().map(RestaurantDto::fromRestaurant).collect(Collectors.toList());
//    }
//
//    public static Restaurant getRestaurantForCreate() {
//        return restaurantForCreate;
//    }
//
//    public static Restaurant getRestaurantForUpdate() {
//        return restaurantForUpdate;
//    }
//
//    public static Meal getMealForCreate() {
//        return mealForCreate;
//    }
//
//    public static Meal getMealForUpdate() {
//        return mealForUpdate;
//    }
//}
