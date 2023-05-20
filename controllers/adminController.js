import mysql from "mysql2";
import { dbParams } from "../DB/index.js";

export const addItem = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });
    let date = new Date().toISOString().slice(0, 19).replace("T", " ");
    const request =
      "INSERT INTO items (name, id_category, id_subcategory, id_color, id_origin, id_set, id_cut, description, price, sale_price, weight, video, id_treatment, id_clarity, id_availability, id_is_onsale, added) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.execute(
      request,
      [
        req.body.name,
        req.body.cat,
        req.body.subcat,
        req.body.color,
        req.body.origin,
        req.body.set,
        req.body.cut,
        req.body.description,
        req.body.price,
        req.body.saleprice,
        req.body.weight,
        req.body.video,
        req.body.treatment,
        req.body.clarity,
        req.body.avail,
        req.body.sale,
        date
      ],
      function (err, results, fields) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            Message: results.insertId
          });
        }
      }
    );
    connection.end((err, conn) => {
      if (err) {
        console.error("Unable to close connection");
      } else {
        console.log("Connection closed");
      }
    });
  } catch (err) {
    console.error(err);
  }
}

export const addImgs = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });
    const request =
      "INSERT INTO images (id_item, img) VALUES (?, ?)";
    connection.execute(
      request,
      [
        req.body.item_id,
        req.body.imgUrl
      ],
      function (err, results, fields) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            Message: results,
          });
        }
      }
    );
    connection.end((err, conn) => {
      if (err) {
        console.error("Unable to close connection");
      } else {
        console.log("Connection closed");
      }
    });
  } catch (err) {
    console.error(err);
  }
}

export const addCertificate = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });
    const request = "UPDATE items SET certificate = ? WHERE id = ?";
    connection.execute(
      request,
      [req.body.imgUrl, req.body.item_id],
      function (err, results, fields) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            Message: results,
          });
        }
      }
    );
    connection.end((err, conn) => {
      if (err) {
        console.error("Unable to close connection");
      } else {
        console.log("Connection closed");
      }
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteImg = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });    
    const request = "DELETE FROM images WHERE id = ?";
    connection.execute(
      request,
      [req.params.id],
      function (err, results, fields) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            Message: results,
            Fields: fields
          });
        }
      }
    );
    connection.end((err, conn) => {
      if (err) {
        console.error("Unable to close connection");
      } else {
        console.log("Connection closed");
      }
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteCert = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });
    const request = "UPDATE items SET certificate = '' WHERE id = ?";
    connection.execute(
      request,
      [req.params.id],
      function (err, results, fields) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            Message: results,
            Fields: fields,
          });
        }
      }
    );
    connection.end((err, conn) => {
      if (err) {
        console.error("Unable to close connection");
      } else {
        console.log("Connection closed");
      }
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteItem = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });
    const request = "DELETE FROM items WHERE id = ?";
    connection.execute(
      request,
      [req.params.id],
      function (err, results, fields) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            Message: results,
            Fields: fields,
          });
        }
      }
    );
    connection.end((err, conn) => {
      if (err) {
        console.error("Unable to close connection");
      } else {
        console.log("Connection closed");
      }
    });
  } catch (err) {
    console.error(err);
  }
}

export const editOneField = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });
    const request = `UPDATE items SET ${req.params.type} = ? WHERE id = ?`;
    
    connection.execute(
      request,
      [req.body.field, req.body.id],
      function (err, results, fields) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            Message: results,
            Fields: fields,
          });
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
}

export const addFieldToTable = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });
    const request = `INSERT INTO ${req.params.type} (name) VALUES (?)`;

    connection.execute(
      request,
      [req.body.field],
      function (err, results, fields) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            Message: results,
            Fields: fields,
          });
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
}

export const editFieldOfTable = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });
    const request = `UPDATE ${req.params.type} SET name = ? WHERE id = ?`;

    connection.execute(
      request,
      [req.body.name, req.body.id],
      function (err, results, fields) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            Message: results,
            Fields: fields,
          });
        }
      }
    );
    connection.end((err, conn) => {
      if (err) {
        console.error("Unable to close connection");
      } else {
        console.log("Connection closed");
      }
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteFieldFromTable = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });
    
    const request = `DELETE FROM ${req.params.type} WHERE id = ?`;
    connection.execute(
      request,
      [req.params.id],
      function (err, results, fields) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            Message: results,
            Fields: fields,
          });
        }
      }
    );
    connection.end((err, conn) => {
      if (err) {
        console.error("Unable to close connection");
      } else {
        console.log("Connection closed");
      }
    });
  } catch (err) {
    console.error(err);
  }
};

export const addGlossItem = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `INSERT INTO glossarium (title, id_category, text) VALUES (?, ?, ?)`;
    console.log(req.body.title, req.body.id_category, req.body.text);
    connection.execute(
      request,
      [req.body.title, req.body.id_category, req.body.text],
      function (err, results, fields) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            Message: results,
            Fields: fields,
          });
        }
      }
    );

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