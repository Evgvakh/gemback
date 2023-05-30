import mysql from "mysql2";
import { dbParams } from "../DB/index.js";
import { connect, disconnect } from "../utils/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);    

    const connection = mysql.createConnection(dbParams);
    connect(connection);

    async function getUsers() {
      let res = await new Promise((res, rej) =>
        connection.execute(
          `SELECT * FROM users WHERE login = ?`,
          [req.body.login],
          (err, results) => (err ? rej(err) : res(results))
        )
      );
      return res;
    }

    let rows = await getUsers();

    if (rows.length > 0) {
      res.end("Exists");
    } else {      
      connection.execute(
        `INSERT INTO users (id_role, login, email, password) VALUES (?, ?, ?, ?)`,
        [1, req.body.login, req.body.email, hashPassword],
        function (err, results, fields) {
          if (err) {
            res.json(err);
          } else {
            const token = jwt.sign(
              {
                _id: results.insertId,
              },
              "Pavel20GemVadim23Garden",
              {
                expiresIn: "30d",
              }
            );
            res.send({
              Message: `User "${req.body.login}" successfully added`,
              token: token,
            });
            disconnect(connection);
          }
        }
      );
    }
  } catch (error) {
    res.json(error);
  }
};

export const login = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    async function getUser() {
      let res = await new Promise((res, rej) =>
        connection.execute(
          `SELECT * FROM users WHERE login = ?`,
          [req.body.login],
          (err, results) => (err ? rej(err) : res(results))
        )
      );
      return res[0];
    }

    let user = await getUser();
    
    if (!user) {
      return res.json({
        message: "Wrong data",
      });      
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isValidPass) {
      return res.json({
        message: "Wrong data",
      });
    }

    const token = jwt.sign(
      {
        _id: user.id,
      },
      "Pavel20GemVadim23Garden",
      {
        expiresIn: "30d",
      }
    );

    res.json({
      isLogged: true,
      user: user.login,
      token: token,
    });
  } catch (err) {
    res.send(err);
  }
};
