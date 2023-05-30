import mysql from "mysql2";
import { dbParams } from "../DB/index.js";
import { connect, disconnect, deleteFile } from "../utils/index.js";


export const addItem = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

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
    disconnect(connection);
  } catch (err) {
    console.error(err);
  }
}

export const addImgs = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

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
    disconnect(connection);
  } catch (err) {
    console.error(err);
  }
}

export const addGlossImgs = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    const request = "INSERT INTO gloss_images (id_item, img) VALUES (?, ?)";

    connection.execute(
      request,
      [req.body.item_id, req.body.img],
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
    disconnect(connection);
  } catch (err) {
    console.error(err);
  }
};

export const addCertificate = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

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

    disconnect(connection);
  } catch (err) {
    console.error(err);
  }
};

export const deleteImg = async (req, res) => {
  try {    
    const connection = mysql.createConnection(dbParams);
    connect(connection);
        
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
    await deleteFile(req.body.file);
    disconnect(connection);
  } catch (err) {
    console.error(err);
  }
};

export const deleteGlossImg = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    const request = "DELETE FROM gloss_images WHERE id = ?";

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
    await deleteFile(req.body.file);
    disconnect(connection);
  } catch (err) {
    console.error(err);
  }
};

export const deleteCert = async (req, res) => {
  try {    
    const connection = mysql.createConnection(dbParams);
    connect(connection);

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

    await deleteFile(req.body.file);

    disconnect(connection);
  } catch (err) {
    console.error(err);
  }
};

export const deleteItem = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

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
    
    disconnect(connection);
  } catch (err) {
    console.error(err);
  }
};

export const editOneField = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    const request = `UPDATE items SET ${req.params.type} = ?, updated = ? WHERE id = ?`;
    
    connection.execute(
      request,
      [req.body.field, date, req.body.id],
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

    disconnect(connection);
  } catch (err) {
    console.error(err);
  }
}

export const addFieldToTable = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

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

    disconnect(connection);
  } catch (err) {
    console.error(err);
  }
}

export const editFieldOfTable = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    const request = `UPDATE ${req.params.type} SET ${req.params.field} = ? WHERE id = ?`;

    connection.execute(
      request,
      [req.body.text, req.body.id],
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
    
    disconnect(connection);
  } catch (err) {
    console.error(err);
  }
};

export const deleteFieldFromTable = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);
    
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

    disconnect(connection);
  } catch (err) {
    console.error(err);
  }
};

export const addGlossItem = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

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

    disconnect(connection);
  } catch (err) {
    res.json(err);
  }
};

export const deleteGlossItem = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    const request = `DELETE FROM glossarium WHERE id = ?`;
    console.log(req.body.id);
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

    disconnect(connection);
  } catch (err) {
    res.json(err);
  }
}

export const editGlossItem = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    const request = `UPDATE glossarium SET id_category = ?, title = ?, text = ? WHERE id = ?`;
    console.log(
      req.body.id_category,
      req.body.title,
      req.body.text,
      req.body.id
    );
    connection.execute(
      request,
      [req.body.id_category, req.body.title, req.body.text, req.body.id],
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

    disconnect(connection);
  } catch (err) {
    console.error(err);
  }
}