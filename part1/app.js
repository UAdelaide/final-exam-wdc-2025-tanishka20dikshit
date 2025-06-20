var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql2/promise');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let db;

(async () => {
  try {
    // Create DogWalkService database if not exists
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '' // your MySQL password here
    });
    await connection.query('CREATE DATABASE IF NOT EXISTS DogWalkService');
    await connection.end();

    // Connect to DogWalkService database
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'DogWalkService'
    });
  } catch (err) {
    console.error('Error setting up database:', err);
  }
})();


app.get('/api/dogs', async (req, res) => {
  try {
    const [dogs] = await db.execute(`SELECT dog.name AS dog_name, dog.size AS size, user.username AS owner_username
      FROM Dogs dog
      JOIN Users user ON dog.owner_id = user.user_id
      `);
    res.json(dogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

app.get('/api/walkrequests/open', async (req, res) => {
  try {
    const [requests] = await db.execute(`SELECT req.request_id, dog.name AS dog_name, req.requested_time, req.duration_minutes, req.location, user.username AS owner_username
        FROM WalkRequests req WHERE status = 'open'
        JOIN Dogs dog ON req.dog_id = dog.dog_id
        JOIN Users user ON 
        `);
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch walk requests' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

const port = 8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
