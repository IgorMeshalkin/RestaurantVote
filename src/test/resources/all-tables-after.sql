DELETE
FROM meals;
DELETE
FROM restaurants;
DELETE
FROM votes;
DELETE
FROM users;
ALTER TABLE votes
    ENABLE KEYS;