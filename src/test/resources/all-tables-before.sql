DELETE
FROM meals;
DELETE
FROM restaurants;
DELETE
FROM votes;
DELETE
FROM users;

INSERT users(id, username, password, first_name, last_name, role, created, updated, active)
VALUES (1, 'admin', '$2a$12$sJRGxiMBj0S9bocY/aOkvurjsLwm.877ncQIe2zgcWOCeQItzQRuq', 'Игорь', 'Мешалкин', 'ADMIN',
        current_timestamp(), current_timestamp(), true),
       (2, 'ivan', '$2a$12$2vOTh3/CyvRgC1xDRg2/2.C0.pxzuwEgD0K91.cTQ1wIkmeowNuWu', 'Иван', 'Иванов', 'USER',
        current_timestamp(), current_timestamp(), true),
       (3, 'petr', '$2a$12$Kbst4hU./lWV3LY36dI./uKnAtTBk0EBlGgVlKuu46g.GFuD7kf4S', 'Петр', 'Петров', 'USER',
        current_timestamp(), current_timestamp(), true);

INSERT restaurants(id, name, created, updated)
VALUES (1, 'Subway', current_timestamp(), current_timestamp()),
       (2, 'Starbucks', current_timestamp(), current_timestamp()),
       (3, 'KFC', current_timestamp(), current_timestamp());

INSERT meals(id, name, price, created, updated, restaurant_id)
VALUES (1, 'Сендвич', 125.5, current_timestamp(), current_timestamp(), 1),
       (2, 'Чай', 60.0, current_timestamp(), current_timestamp(), 1),
       (3, 'Чизкейк', 153.7, current_timestamp(), current_timestamp(), 2),
       (4, 'Кофе', 110.3, current_timestamp(), current_timestamp(), 2),
       (5, 'Чизбургер', 170.55, current_timestamp(), current_timestamp(), 3),
       (6, 'Кола', 93.6, current_timestamp(), current_timestamp(), 3);

ALTER TABLE restaurants
    AUTO_INCREMENT = 4;
ALTER TABLE meals
    AUTO_INCREMENT = 7;
ALTER TABLE votes
    AUTO_INCREMENT = 1;
ALTER TABLE votes
    DISABLE KEYS;