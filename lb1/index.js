const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Підключення до бази даних (SQLite)
const db = new sqlite3.Database(':memory:'); // Використовую тимчасову пам'ять для демонстрації

// Створення таблиці Car
db.serialize(() => {
  db.run('CREATE TABLE Car (id INT, model TEXT, year INT, price REAL)');
});

// Обробка запиту GET
app.get('/cars', (req, res) => {
  db.all('SELECT * FROM Car', (err, rows) => {
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
  db.run('INSERT INTO Car (id, model, year, price) VALUES (?, ?, ?, ?)', [id, model, year, price], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Car added successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
