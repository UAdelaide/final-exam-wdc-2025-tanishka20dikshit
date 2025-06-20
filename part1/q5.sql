INSERT INTO Users (username, email, password_hash, role)
VALUES ('alice123','alice@example.com','hashed123','owner'),
       ('bobwalker','bob@example.com','hashed456','walker'),
       ('carol123','carol@example.com','hashed789','owner'),
       ('jonh123','johndoe@example.com','hashed101','owner'),
       ('amanda123','amanda@example.com','hashed122','walker');

INSERT INTO Dog (owner_id, name, size)
VALUES ((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
       ((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small'),
       ((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bruno', 'medium'),
       ((SELECT user_id FROM Users WHERE username = 'john123'), 'coco', 'large'),
       ((SELECT user_id FROM Users WHERE username = 'john123'), 'Maxine', 'medium'),

INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
VALUES ((SELECT dog_id FROM Dogs WHERE name = 'Max'),'2025-06-10 08:00:00',30,'Parklands','open'),
       ((SELECT dog_id FROM Dogs WHERE name = 'Bella'),'06-10 09:30:00',45,'Beachside Ave','accepted'),
       ((SELECT dog_id FROM Dogs WHERE name = 'Bruno'),'11-10 10:30:00',50,'Grant Ave','accepted'),
       ((SELECT dog_id FROM Dogs WHERE name = 'coco'),'06-10 09:35:00',45,'glenelg','open'),
       ((SELECT dog_id FROM Dogs WHERE name = 'Maxine'),'09-10 09:30:00',60,'Walker','accepted'),