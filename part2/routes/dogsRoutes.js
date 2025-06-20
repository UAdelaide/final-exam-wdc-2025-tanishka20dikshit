

router.get('/dogs', async (req, res) => {
  try {
    const [dogs] = await db.execute(`SELECT Dogs.dog_id, Dogs.name AS dog_name, Dogs.size, Dogs.photo, Users.username AS owner_username
      FROM Dogs
      JOIN Users ON Dogs.owner_id = Users.user_id`);
    res.json(dogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});
