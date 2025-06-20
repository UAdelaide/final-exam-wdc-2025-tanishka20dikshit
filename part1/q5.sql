INSERT INTO Users (username, email, password_hash, role)
VALUES ('alice123','alice@example.com','hashed123','owner'),
       ('bobwalker','bob@example.com','hashed456','walker'),
       ('carol123','carol@example.com','hashed789','owner'),
       ('jonh123','johndoe@example.com','hashed101','owner'),
       ('amanda123','amanda@example.com','hashed122','walker');

INSERT INTO Dog (owner_id, name, size)
VALUES ((SELECT user_id FROM Users WHERE username=))