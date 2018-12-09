import { Router } from "express";
import mysql from 'mysql';

let router = Router();

let pool = mysql.createPool({
  host: "localhost",
  user: "app",
  password: "appUser",
  database: "chirpr"
});

router.get("/:id?", (req, res) => {
  let id = req.params.id;

  if (id) {
    pool.query(`CALL getChirp(${id})`, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  }
  else {
    pool.query(`CALL getAllChirps()`, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  }
});

router.post("/", (req, res) => {
  let name = 1;
  let text = req.body.text;
  pool.query(`CALL createChirp(${name}, '${text}')`, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

router.put("/:id", (req, res) => {
  let id = req.params.id;
  let chirpText = req.body.text;

  pool.query(`CALL updateChirp(${id}, '${chirpText}')`, (err, results) => {
    if (err) throw err;
  });
});

router.delete("/:id", (req, res) => {
  let id = req.params.id;

  pool.query(`CALL deleteChirp(${id})`, (err, res) => {
    if (err) throw err;
  });
});

export default router;
