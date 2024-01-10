
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./gik339.db');
const express = require('express');
const server = express();


server

  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');

    next();
  });


server.listen(3000, () => {

  console.log('Server running on http://localhost:3000');
});


server.get('/cars', (req, res) => {
  const sql = 'SELECT * FROM cars';
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {

      res.send(rows);
    }
  });
});

server.get('/cars/:id', (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM cars WHERE id=${id}`;

  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(rows[0]);
    }
  });
});

server.post('/cars', (req, res) => {
  const car = req.body;
  const sql = `INSERT INTO cars(model, manufac, regnr, color, fuel) VALUES (?,?,?,?,?)`;

  db.run(sql, Object.values(car), (err) => {
    if (err) {
      console.error("Error",err);
      res.status(500).json(err);
    } else {
      res.status(200).json('Bilen sparades');
    }
  });
});

server.put('/cars', (req, res) => {
  const bodyData = req.body;

  const id = bodyData.id;
  const car = {
    model: bodyData.model,
    manufac: bodyData.manufac,
    regnr: bodyData.regnr,
    color: bodyData.color,
    fuel: bodyData.fuel
  };

  let updateString = '';
  const columnsArray = Object.keys(car);
  columnsArray.forEach((column, i) => {
    updateString += `${column}="${car[column]}"`;
    if (i !== columnsArray.length - 1) updateString += ',';
  });
  const sql = `UPDATE cars SET ${updateString} WHERE id=${id}`;

  db.run(sql, (err) => {
    if (err) {
      console.error("Error",err);
      res.status(500).json(err);
    } else {
      res.status(200).json('Bilen uppdaterades');
    }
  });
  //UPDATE cars SET model="Mikaela",manufac="Hedberg" WHERE id=1
});

server.delete('/cars/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM cars WHERE id = ${id}`;

  db.run(sql, (err) => {
    if (err) {
      console.error("Error",err);
      res.status(500).json(err);
    } else {
      res.status(200).json('Bilen är borttagen');
    }
  });
});

