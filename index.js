const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const PORT = 8000;

const pool = mysql.createPool({
  connectionLimit: 30,
  host: "localhost",
  user: "root",
  password: "password",
  database: "lpulabdb_test",
});

app.get("/", (req, res) => {
  res.send("running web app test updated");
});

app.get("/test", (req, res) => {
  const sqlSelect = "SELECT * FROM studentprofile";
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("SELECT * FROM studentprofile", (err, result) => {
      connection.release();
      if (!err) {
        res.send({ result });
      } else {
        console.log(err);
      }
    });
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//STUDENT REGISTRATION
app.get("/check/student/profile", (req, res) => {
  const studentNumber = req.body.studentNumber;

  const sqlSelect = "SELECT * FROM studentprofile WHERE studentNumber=?";
  pool.query(sqlSelect, [studentNumber], (err, result) => {
    res.send(result);
    if (err) {
      res.send({ err: err });
    }
  });
});
app.get("/check/student/regrequest", (req, res) => {
  const studentNumber = req.body.studentNumber;

  const sqlSelect = "SELECT * FROM studentregrequest WHERE studentNumber=?";
  pool.query(sqlSelect, [studentNumber], (err, result) => {
    res.send(result);
    if (err) {
      res.send({ err: err });
    }
  });
});
app.post("/insert/student", (req, res) => {
  const studentNumber = req.body.studentNumber;
  const password = req.body.studentPassword;
  const lastname = req.body.lastname;
  const firstName = req.body.firstName;
  const middleName = req.body.middleName;
  const course = req.body.course;
  const year = req.body.year;
  const section = req.body.section;
  const phNumber = req.body.phNumber;

  const sqlInsert =
    "INSERT INTO studentregrequest (studentNumber, password, lastName, firstName, middleName, course, year, section, phoneNumber, timeRegistered, dateRegistered ) VALUES (?,?,?,?,?,?,?,?,?,NOW(),NOW())";
  pool.query(
    sqlInsert,
    [
      studentNumber,
      password,
      lastname,
      firstName,
      middleName,
      course,
      year,
      section,
      phNumber,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

//FACULTY REGISTRATION
app.get("/check/faculty/profile", (req, res) => {
  const facultyID = req.body.facultyID;

  const sqlSelect = "SELECT * FROM facultyprofile WHERE facultyID=?";
  pool.query(sqlSelect, [facultyID], (err, result) => {
    res.send(result);
    if (err) {
      res.send({ err: err });
    }
  });
});
app.get("/check/faculty/regrequest", (req, res) => {
  const facultyID = req.body.facultyID;

  const sqlSelect = "SELECT * FROM facultyregrequest WHERE facultyID=?";
  pool.query(sqlSelect, [facultyID], (err, result) => {
    res.send(result);
    if (err) {
      res.send({ err: err });
    }
  });
});
app.post("/insert/faculty", (req, res) => {
  const facultyID = req.body.facultyID;
  const password = req.body.facultyPassword;
  const lastname = req.body.lastname;
  const firstName = req.body.firstName;
  const middleName = req.body.middleName;
  const phNumber = req.body.phNumber;

  const sqlInsert =
    "INSERT INTO facultyregrequest (facultyID, password, lastName, firstName, middleName, phoneNumber, timeRegistered, dateRegistered) VALUES (?,?,?,?,?,?,NOW(), NOW())";
  pool.query(
    sqlInsert,
    [facultyID, password, lastname, firstName, middleName, phNumber],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

//STUDENT LOGIN
app.get("/login/student/profile", (req, res) => {
  const studentNumber = req.body.studentNumber;
  const password = req.body.password;

  const sqlSelect =
    "SELECT * FROM studentprofile WHERE studentNumber=? AND password=?";
  pool.query(sqlSelect, [studentNumber, password], (err, result) => {
    res.send(result);
    if (err) {
      res.send({ err: err });
    }
  });
});
app.get("/login/student/regrequest", (req, res) => {
  const studentNumber = req.body.studentNumber;
  const password = req.body.password;

  const sqlSelect =
    "SELECT * FROM studentregrequest WHERE studentNumber=? AND password=?";
  pool.query(sqlSelect, [studentNumber, password], (err, result) => {
    res.send(result);
    if (err) {
      res.send({ err: err });
    }
  });
});
