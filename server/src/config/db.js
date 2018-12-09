import mysql from "mysql";
// let mysql = require('mysql');

function search(sql) {
  return new Promise((resolve, reject) => {
    let pool = mysql.createPool({
      host: "localhost",
      user: "app",
      password: "appUser",
      database: "chirpr"
    });

    pool.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

export default search;