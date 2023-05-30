import PoweredFileSystem from "pwd-fs";

export async function getItems(preparedReq, conn, parameters = null) {
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

export async function getItemsWithImages(
  preparedReq,
  conn,
  table,
  id = null,
  lim = null,
  offs = null
) {
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
        conn.execute(`SELECT * FROM ${table}`, (err, results) =>
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

    item.titleImg = newImgsArr.length > 0 ? newImgsArr[0].img : "";
  });

  return items;
}

export async function connect(conn) {
  conn.connect(function (err) {
    if (err) {
      return console.error("Error: " + err.message);
    } else {
      console.log("Connected to DB");
    }
  });
}

export async function disconnect(conn) {
  conn.end((err, conn) => {
    if (err) {
      console.error("Unable to close connection");
    } else {
      console.log("Connection closed");
    }
  });
}

export const deleteFile = async (path) => {
  const pfs = new PoweredFileSystem();
  const del = await pfs.remove(path);  
};
