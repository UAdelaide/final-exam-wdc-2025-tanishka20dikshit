const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();
const mysql = require('mysql2/promise');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let db;

app.use(session({
    secret: 'a1897259',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

app.get('/dogs', async (req, res) => {
  try {
    const [dogs] = await db.execute(`SELECT dog.dog_id,
      dog.name AS dog_name,
      dog.size,
      user.user_id AS owner_id
      FROM Dogs dog
      JOIN Users user ON dog.owner_id = user.user_id
      `);
    res.json(dogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});


// Export the app instead of listening here
module.exports = app;

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
