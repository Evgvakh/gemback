import mysql from "mysql2";
import { dbParams } from "../DB/index.js";

export const addItem = (req, res) => {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });
    const request =
      "INSERT INTO items (name, id_category, id_subcategory, id_color, id_origin, id_set, id_cut, id_treatment, id_clarity, id_availability, id_is_onsale) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.execute(
      request,
        [req.body.name,
            req.body.id_cat,
            req.body.id_subcat,
            req.body.id_color,
            req.body.id_origin,
            req.body.id_set,
            req.body.id_cut,
            req.body.id_treat,
            req.body.id_clarity,
            req.body.id_avail,
            req.body.id_sale
        ],
      function (err, results, fields) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            Message: `Post "${req.body.title}" successfully added with id: ${results.insertId}`,
          });
        }
      }
    );    
}
