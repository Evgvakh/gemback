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