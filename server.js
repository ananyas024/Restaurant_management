const express = require('express');
const app = express();
const db = require('./db');  // Assuming the db.js file exists in the same directory
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Fetch menu items (GET)
app.get('/api/menu', (req, res) => {
  const query = 'SELECT * FROM menu';
  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Insert new item (POST)
app.post('/api/menu', (req, res) => {
  const { food_name, food_price } = req.body;
  const query = 'INSERT INTO menu (food_name, food_price) VALUES (?, ?)';
  db.query(query, [food_name, food_price], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error adding item' });
      return;
    }
    const newItem = {
      food_id: result.insertId,
      food_name,
      food_price
    };
    res.status(201).json(newItem);
  });
});

// Delete an item (DELETE)
app.delete('/api/menu/:id', (req, res) => {
  const foodId = req.params.id;
  const query = 'DELETE FROM menu WHERE food_id = ?';
  db.query(query, [foodId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting item' });
      return;
    }
    res.json({ message: 'Item deleted successfully!' });
  });
});

// Update an item (PUT)
app.put('/api/menu/:id', (req, res) => {
  const foodId = req.params.id;
  const { food_name, food_price } = req.body;  // Removed food_image
  const query = 'UPDATE menu SET food_name = ?, food_price = ? WHERE food_id = ?';
  db.query(query, [food_name, food_price, foodId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating item' });
      return;
    }
    res.json({ message: 'Item updated successfully!' });
  });
});

// Add a new expense (POST)
app.post('/api/expenses', (req, res) => {
  const { expense_date, description, amount } = req.body;
  const query = 'INSERT INTO expenses (expense_date, description, amount) VALUES (?, ?, ?)';
  db.query(query, [expense_date, description, amount], (err, result) => {
    if (err) {
      console.error('Error adding expense:', err);
      res.status(500).json({ message: 'Error adding expense' });
      return;
    }
    const newExpense = {
      expense_id: result.insertId,
      expense_date,
      description,
      amount
    };
    res.status(201).json(newExpense);
  });
});

// Get all expenses (GET)
app.get('/api/expenses', (req, res) => {
  const query = 'SELECT * FROM expenses';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching expenses:', err);
      res.status(500).json({ message: 'Error fetching expenses' });
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
