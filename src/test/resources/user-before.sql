DELETE
FROM users;

INSERT users(id, username, password, first_name, last_name, role, created, updated, active)
VALUES (1, 'admin', '$2a$12$sJRGxiMBj0S9bocY/aOkvurjsLwm.877ncQIe2zgcWOCeQItzQRuq', 'Игорь', 'Мешалкин', 'ADMIN',
        current_timestamp(), current_timestamp(), true),
       (2, 'ivan', '$2a$12$2vOTh3/CyvRgC1xDRg2/2.C0.pxzuwEgD0K91.cTQ1wIkmeowNuWu', 'Иван', 'Иванов', 'USER',
        current_timestamp(), current_timestamp(), true),
       (3, 'petr', '$2a$12$Kbst4hU./lWV3LY36dI./uKnAtTBk0EBlGgVlKuu46g.GFuD7kf4S', 'Петр', 'Петров', 'USER',
        current_timestamp(), current_timestamp(), true);

ALTER TABLE users
    AUTO_INCREMENT = 4;