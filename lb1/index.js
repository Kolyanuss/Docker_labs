const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'password',
  database: 'test_db_node'
});

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Підключення до бази даних
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Створення таблиці Car
connection.query('CREATE TABLE Car (id INT PRIMARY KEY, model TEXT, year INT, price REAL)',
  (err, results) => {// обробка помилок та результатів
});
connection.query('INSERT INTO Car (id, model, year, price) VALUES (1, "TESLA", 2077, 10999)', 
  (err, results) => {
    if (err) throw err;
    console.log('Test info added successfully');
});

// Обробка запиту GET
app.get('/cars', (req, res) => {
  connection.query('SELECT * FROM Car', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Обробка запиту POST
app.post('/cars', (req, res) => {
  const { id, model, year, price } = req.body;
  connection.query(
    'INSERT INTO Car (id, model, year, price) VALUES (?, ?, ?, ?)', 
    [id, model, year, price], 
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Car added successfully' });
    });
});

// Обробка запиту PUT
app.put('/cars/:id', (req, res) => {
  const { id } = req.params;
  const { model, year, price } = req.body;
  connection.query(
    'UPDATE Car SET model = ?, year = ?, price = ? WHERE id = ?',
    [model, year, price, id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: `Car with id ${id} was updated.` });
    }
  );
});

// Обробка запиту DELETE
app.delete('/cars/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM Car WHERE id = ?', [id],  (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // res.json(rows);
    res.json({ message: `Car with id ${id} was deleted.` });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
