import mysql from "mysql2";
import { dbParams } from "../DB/index.js";

async function getItems(conn, preparedReq) {
  let res = await new Promise((res, rej) =>
    conn.execute(preparedReq, (err, results) => (err ? rej(err) : res(results)))
  );
  return res;
}

export const getCategories = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT * FROM categories`;
   
    const cats = await getItems(connection, request);
    res.json(cats);
  } catch (err) {
    res.json(err);
  }
};

export const getSubcats = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT * FROM subcategories`;    

    const subcats = await getItems(connection, request);
    res.json(subcats);
  } catch (err) {
    res.json(err);
  }
};

export const getColors = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT * FROM colors`;

    const colors = await getItems(connection, request);
      
    res.json(colors);      
  } catch (err) {
    res.json(err);
  }
};

export const getOrigins = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT * FROM origin`;

    const origin = await getItems(connection, request);

    res.json(origin);
  } catch (err) {
    res.json(err);
  }
};

export const getSets = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT * FROM sets`;

    const sets = await getItems(connection, request);

    res.json(sets);
  } catch (err) {
    res.json(err);
  }
};

export const getCuts = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT * FROM cut`;

    const cuts = await getItems(connection, request);

    res.json(cuts);
  } catch (err) {
    res.json(err);
  }
};

export const getTreatments = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT * FROM treatment`;

    const treatment = await getItems(connection, request);

    res.json(treatment);
  } catch (err) {
    res.json(err);
  }
};

export const getClarities = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT * FROM clarity`;

    const clarity = await getItems(connection, request);

    res.json(clarity);
  } catch (err) {
    res.json(err);
  }
};

export const getAvails = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT * FROM available`;

    const avails = await getItems(connection, request);

    res.json(avails);
  } catch (err) {
    res.json(err);
  }
};

export const getSales = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT * FROM is_onsale`;

    const sales = await getItems(connection, request);

    res.json(sales);
  } catch (err) {
    res.json(err);
  }
};