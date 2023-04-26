import mysql from "mysql2";
import { dbParamsRU } from "../../DB/index.js";

async function ruGetItems(conn, preparedReq) {
  let res = await new Promise((res, rej) =>
    conn.execute(preparedReq, (err, results) => (err ? rej(err) : res(results)))
  );
  return res;  
}

export const ruGetCategories = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParamsRU);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT * FROM categories`;

    const cats = await ruGetItems(connection, request);
    res.json(cats);

    connection.end((err, conn) => {
      if (err) {
        console.error("Unable to close connection");
      } else {
        console.log("Connection closed");
      }
    });
  } catch (err) {
    res.json(err);
  }
};

export const ruGetSubcats = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParamsRU);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT * FROM subcategories`;

    const subcats = await ruGetItems(connection, request);
    res.json(subcats);

    connection.end((err, conn) => {
      if (err) {
        console.error("Unable to close connection");
      } else {
        console.log("Connection closed");
      }
    });
  } catch (err) {
    res.json(err);
  }
};

export const ruGetColors = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParamsRU);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT * FROM colors`;

    const colors = await ruGetItems(connection, request);

    res.json(colors);

    connection.end((err, conn) => {
      if (err) {
        console.error("Unable to close connection");
      } else {
        console.log("Connection closed");
      }
    });
  } catch (err) {
    res.json(err);
  }
};

export const ruGetOrigins = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParamsRU);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT * FROM origin`;

    const origin = await ruGetItems(connection, request);

    res.json(origin);

    connection.end((err, conn) => {
      if (err) {
        console.error("Unable to close connection");
      } else {
        console.log("Connection closed");
      }
    });
  } catch (err) {
    res.json(err);
  }
};

export const ruGetSets = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParamsRU);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT * FROM sets`;

    const sets = await ruGetItems(connection, request);

    res.json(sets);

    connection.end((err, conn) => {
      if (err) {
        console.error("Unable to close connection");
      } else {
        console.log("Connection closed");
      }
    });
  } catch (err) {
    res.json(err);
  }
};

export const ruGetCuts = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParamsRU);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT * FROM cut`;

    const cuts = await ruGetItems(connection, request);

    res.json(cuts);

    connection.end((err, conn) => {
      if (err) {
        console.error("Unable to close connection");
      } else {
        console.log("Connection closed");
      }
    });
  } catch (err) {
    res.json(err);
  }
};

export const ruGetTreatments = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParamsRU);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT * FROM treatment`;

    const treatment = await ruGetItems(connection, request);

    res.json(treatment);

    connection.end((err, conn) => {
      if (err) {
        console.error("Unable to close connection");
      } else {
        console.log("Connection closed");
      }
    });
  } catch (err) {
    res.json(err);
  }
};

export const ruGetClarities = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParamsRU);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT * FROM clarity`;

    const clarity = await ruGetItems(connection, request);

    res.json(clarity);

    connection.end((err, conn) => {
      if (err) {
        console.error("Unable to close connection");
      } else {
        console.log("Connection closed");
      }
    });
  } catch (err) {
    res.json(err);
  }
};

export const ruGetAvails = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParamsRU);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT * FROM available`;

    const avails = await ruGetItems(connection, request);

    res.json(avails);

    connection.end((err, conn) => {
      if (err) {
        console.error("Unable to close connection");
      } else {
        console.log("Connection closed");
      }
    });
  } catch (err) {
    res.json(err);
  }
};

export const ruGetSales = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParamsRU);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT * FROM is_onsale`;

    const sales = await ruGetItems(connection, request);

    res.json(sales);

    connection.end((err, conn) => {
      if (err) {
        console.error("Unable to close connection");
      } else {
        console.log("Connection closed");
      }
    });
  } catch (err) {
    res.json(err);
  }
};