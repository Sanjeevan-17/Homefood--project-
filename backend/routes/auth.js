const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');

const router = express.Router();

router.post('/register-cook', async (req, res) => {
  console.log('Received data:', req.body);
  try {
    const { name, email, password, phone, address, speciality, idProof } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      `INSERT INTO users (name, email, password, phone, address, role, speciality, id_proof)
       VALUES (?,?,?,?,?,?,?,?)`,
      [name, email, hashedPassword, phone, address, 'cook', speciality, idProof]
    );
    res.json({ success: true, userId: result.insertId });
  } catch (error) {
    console.log('Register error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.json({ success: false, message: 'User not found' });
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: 'Wrong password' });
    res.json({ success: true, userId: user.id, role: user.role, name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

router.post('/add-meal', async (req, res) => {
  try {
    const { cookId, name, price, category, cuisine, description, veg, serves } = req.body;
    const [result] = await db.query(
      `INSERT INTO meals (cook_id, meal_name, description, price, category, cuisine, veg, serves)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [cookId, name, description, price, category, cuisine, veg, serves]
    );
    res.json({ success: true, mealId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

router.get('/meals/:cookId', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM meals WHERE cook_id = ?', [req.params.cookId]);
    res.json({ success: true, meals: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

router.get('/all-meals', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT meals.*, users.name as cook_name 
       FROM meals JOIN users ON meals.cook_id = users.id`
    );
    res.json({ success: true, meals: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

router.post('/place-order', async (req, res) => {
  try {
    const { userId, items, address, total, donate } = req.body;
    const [result] = await db.query(
      `INSERT INTO orders (user_id, items, address, total, donate)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, JSON.stringify(items), address, total, donate]
    );
    res.json({ success: true, orderId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;