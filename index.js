const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./connection");
const response = require("./response");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  response(200, "api v1", "ok", res);
});

app.get("/api/mahasiswa", (req, res) => {
  const sqlQuery = "SELECT * FROM mahasiswa";
  db.query(sqlQuery, (error, field) => {
    if (error) throw error;
    response(200, field, "ok", res);
  });
});

app.get("/api/mahasiswa/:nim", (req, res) => {
  const nim = req.params.nim;
  const sqlQuery = `SELECT * FROM mahasiswa WHERE nim = ${nim}`;
  db.query(sqlQuery, (error, field) => {
    response(200, field, "ok", res);
  });
});

app.post("/api/mahasiswa", (req, res) => {
  const { nim, nama, alamat } = req.body;
  const sqlQuery = `INSERT INTO mahasiswa (nim,nama,alamat) VALUES (?, ?, ?)`;
  db.query(sqlQuery, [nim, nama, alamat], (err, field) => {
    if (err) {
      console.log(err);
    } else {
      console.log(field);
      response(200, field.insertId, "ok", res);
    }
  });
});

app.put("/api/mahasiswa", (req, res) => {
  const { nim, nama, alamat } = req.body;
  console.log(req.body);
  const sqlQuery = "UPDATE mahasiswa SET nama = ?, alamat = ? WHERE nim = ?";
  db.query(sqlQuery, [nama, alamat, nim], (err, field) => {
    if (err) {
      console.log(err);
    } else {
      console.log(field);
      response(200, field.affectedRows, "data diupdate", res);
    }
  });
});

app.delete("/api/mahasiswa", (req, res) => {
  const { nim } = req.body;
  const sqlQuery = "DELETE FROM mahasiswa WHERE nim = ?";
  db.query(sqlQuery, nim, (err, field) => {
    if (err) {
      console.log(err);
    } else {
      response(200, field.affectedRows, "data didelete", res);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
