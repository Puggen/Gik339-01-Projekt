/* Importera npm-paket sqlite3 med hjälp av require() och lagrar i variabeln sqlite */
const sqlite = require('sqlite3').verbose();
/* Skapar ny koppling till databas-fil som skapades tidigare. */
const db = new sqlite.Database('./gik339.db');

/* Importerar npm-paket express och lagrar i variabeln express */
const express = require('express');
/* Skapar server med hjälp av express */
const server = express();

/* Sätter konfiguration på servern */
server
  /* Data ska kommuniceras i JSON-format */
  .use(express.json())
  /* Sättet som data ska kodas och avkodas på */
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    /* Headers för alla förfrågningar. Hanterar regler för CORS (vilka klienter som får anropa vår server och hur.) */
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    /* Säger åt servern att fortsätta processa förfrågan */
    next();
  });

/* Startar servern på port 3000 */
server.listen(3000, () => {
  /* Meddelande för feedback att servern körs */
  console.log('Server running on http://localhost:3000');
});

/* Hantering av GET-requests till endpointen /cars */
server.get('/cars', (req, res) => {
  /* sql-query för att hämta alla cars ur databasen. */
  const sql = 'SELECT * FROM cars';
  /* Anrop till db-objektets funktion .all som används till att hämta upp rader ur en tabell */
  db.all(sql, (err, rows) => {
    /* Callbackfunktionen har parametern err för att lagra eventuella fel */
    if (err) {
      /* Om det finns något i det objektet skickar vi ett svar tillbaka att något gick fel (status 500) och info om vad som gick fel (innehållet i objektet err) */
      res.status(500).send(err);
    } else {
      /* Annars, om allt gick bra, skickar vi de rader som hämtades upp.  */
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
      res.status(500).json({error:err.message});
    } else {
      console.log('Bilen sparades')
      res.status(200).json({message:'Bilen sparades'});
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
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send('Bilen uppdaterades');
    }
  });
  //UPDATE cars SET model="Mikaela",manufac="Hedberg" WHERE id=1
});

server.delete('/cars/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM cars WHERE id = ${id}`;

  db.run(sql, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send('Bilen borttagen');
    }
  });
});

