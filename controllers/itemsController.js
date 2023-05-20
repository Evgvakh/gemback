import mysql from "mysql2";
import { dbParams } from "../DB/index.js";

async function getItems(preparedReq, conn, parameters = null) {
  try {
    let res = await new Promise((res, rej) =>
      conn.execute(preparedReq, parameters, (err, results) =>
        err ? rej(err) : res(results)
      )
    );
    return res;
  } catch (err) {
    return err;
  }
}

async function getItemsWithImages(preparedReq, conn, id = null, lim = null, offs = null) {
  async function getItems() {
    try {
      let res = await new Promise((res, rej) =>
        conn.execute(preparedReq, [id], (err, results) =>
          err ? rej(err) : res(results)
        )
      );
      return res;
    } catch (err) {
      return err;
    }
  }

  async function getImages() {
    try {
      let res = await new Promise((res, rej) =>
        conn.execute(`SELECT * FROM images`, (err, results) =>
          err ? rej(err) : res(results)
        )
      );
      return res;
    } catch (err) {
      return err;
    }
  }

  const items = await getItems();
  const images = await getImages();

  items.map((item) => {
    let imgs = images.filter((img) => img.id_item === item.id);
    let newImgsArr = imgs.map((el) => {
      return { id: el.id, img: el.img };
    });
    item.images = newImgsArr;

    item.titleImg = newImgsArr.length > 0 ? newImgsArr[0].img : '';
  });

  return items;
}

export const getAllItems = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });
    const request = `SELECT items.*,                    
                        categories.name AS category,
                        colors.name AS color,
                        subcategories.name AS subcategory,
                        sets.name AS item_set,
                        cut.name AS cut,
                        origin.name AS origin,
                        clarity.name AS clarity,
                        treatment.name AS treatment,
                        available.name AS availability,
                        is_onsale.name AS onsale
                        FROM items 
                        JOIN categories on items.id_category = categories.id
                        JOIN subcategories on items.id_subcategory = subcategories.id
                        join colors on items.id_color = colors.id
                        join sets on items.id_set = sets.id
                        join cut on items.id_cut = cut.id
                        join origin on items.id_origin = origin.id
                        join clarity on items.id_clarity = clarity.id
                        join treatment on items.id_treatment = treatment.id
                        join available on items.id_availability = available.id
                        join is_onsale on items.id_is_onsale = is_onsale.id
                        ORDER BY id ASC`;

    const items = await getItemsWithImages(request, connection);

    res.json(items);

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

export const getCarouselItems = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT items.*,                    
                        categories.name AS category,
                        colors.name AS color,
                        subcategories.name AS subcategory,
                        sets.name AS item_set,
                        cut.name AS cut,
                        origin.name AS origin,
                        clarity.name AS clarity,
                        treatment.name AS treatment,
                        available.name AS availability,
                        is_onsale.name AS onsale
                        FROM items 
                        JOIN categories on items.id_category = categories.id
                        JOIN subcategories on items.id_subcategory = subcategories.id
                        join colors on items.id_color = colors.id
                        join sets on items.id_set = sets.id
                        join cut on items.id_cut = cut.id
                        join origin on items.id_origin = origin.id
                        join clarity on items.id_clarity = clarity.id
                        join treatment on items.id_treatment = treatment.id
                        join available on items.id_availability = available.id
                        join is_onsale on items.id_is_onsale = is_onsale.id
                        ORDER BY added DESC
                        LIMIT 8`;

    const items = await getItemsWithImages(request, connection);
    res.json(items);

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

export const getAllGemsByCat = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT items.*,                    
                        categories.name AS category,
                        colors.name AS color,
                        subcategories.name AS subcategory,
                        sets.name AS item_set,
                        cut.name AS cut,
                        origin.name AS origin,
                        clarity.name AS clarity,
                        treatment.name AS treatment,
                        available.name AS availability,
                        is_onsale.name AS onsale
                        FROM items 
                        JOIN categories on items.id_category = categories.id
                        JOIN subcategories on items.id_subcategory = subcategories.id
                        join colors on items.id_color = colors.id
                        join sets on items.id_set = sets.id
                        join cut on items.id_cut = cut.id
                        join origin on items.id_origin = origin.id
                        join clarity on items.id_clarity = clarity.id
                        join treatment on items.id_treatment = treatment.id
                        join available on items.id_availability = available.id
                        join is_onsale on items.id_is_onsale = is_onsale.id
                        WHERE id_category = ?`;
    const id_cat = req.params.id;

    const items = await getItemsWithImages(request, connection, id_cat);

    res.json(items);

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

export const getOneGem = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT items.*,                    
                        categories.name AS category,
                        colors.name AS color,
                        subcategories.name AS subcategory,
                        sets.name AS item_set,
                        cut.name AS cut,
                        origin.name AS origin,
                        clarity.name AS clarity,
                        treatment.name AS treatment,
                        available.name AS availability,
                        is_onsale.name AS onsale
                        FROM items 
                        JOIN categories on items.id_category = categories.id
                        JOIN subcategories on items.id_subcategory = subcategories.id
                        join colors on items.id_color = colors.id
                        join sets on items.id_set = sets.id
                        join cut on items.id_cut = cut.id
                        join origin on items.id_origin = origin.id
                        join clarity on items.id_clarity = clarity.id
                        join treatment on items.id_treatment = treatment.id
                        join available on items.id_availability = available.id
                        join is_onsale on items.id_is_onsale = is_onsale.id
                        WHERE items.id = ?`;
    const id = req.params.id;
    const items = await getItemsWithImages(request, connection, id);
    res.json(items[0]);

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


export const getGlossItems = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT glossarium.*,
                      categories.name AS category
                      FROM glossarium
                      JOIN categories on glossarium.id_category = categories.id`;

    async function getItems(preparedReq, conn) {
      try {
        let res = await new Promise((res, rej) =>
          conn.execute(preparedReq, (err, results) =>
            err ? rej(err) : res(results)
          )
        );
        return res;
      } catch (err) {
        return err;
      }
    }

    const items = await getItems(request, connection);
    res.json(items);

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

export const getDescription = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT description FROM ${req.params.table} WHERE id = ?`;

    const items = await getItems(request, connection, [req.params.id]);
    res.json(items[0].description);

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
