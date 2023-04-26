import express from "express";

import cors from "cors";

import {
  getAllItems,
  getAllGemsByCat,
  getOneGem,
  getCarouselItems,
} from "./controllers/itemsController.js";

import {
  addCertificate,
  addImgs,
  addItem,
  deleteCert,
  deleteImg,
  deleteItem,
  editOneField,
  testAdd,
} from "./controllers/adminController.js";

import {
  getCategories,
  getSubcats,
  getColors,
  getOrigins,
  getSets,
  getCuts,
  getTreatments,
  getClarities,
  getAvails,
  getSales,
} from "./controllers/fetchDBFields.js";

import {
  ruGetAllItems,
  ruGetAllGemsByCat,
  ruGetCarouselItems,
  ruGetOneGem,
} from "./controllers/ru/itemsControllerRU.js";
import {
  ruGetAvails,
  ruGetCategories,
  ruGetClarities,
  ruGetColors,
  ruGetCuts,
  ruGetOrigins,
  ruGetSales,
  ruGetSets,
  ruGetSubcats,
  ruGetTreatments,
} from "./controllers/ru/fetchDBFieldsRU.js";

import { uploadCert, uploadImg, uploadVideo } from "./multerStorage/index.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads/img", express.static("uploads/img"));
app.use("/uploads/video", express.static("uploads/video"));
app.use("/uploads/certificates", express.static("uploads/certificates"));
app.use("/uploads/logo", express.static("uploads/logo"));
app.use("/uploads/assets", express.static("uploads/assets"));

app.post("/upload/img", uploadImg.array("img"), (req, res) => {
  let imagesURLs = [];
  for (let i of req.files) {
    imagesURLs.push(`uploads/img/${i.originalname}`);
  }
  res.json(imagesURLs);
});

app.post("/upload/certs", uploadCert.single("certificate"), (req, res) => {
  res.json(`uploads/certificates/${req.file.originalname}`);
});

app.post("/upload/video", uploadVideo.single("video"), (req, res) => {
  res.json(`uploads/video/${req.file.originalname}`);
});

/* ENGLISH VERSION */
app.post("/admin/add", addItem);
app.post("/admin/addImgs", addImgs);
app.post("/admin/addCertificate", addCertificate);
app.post("/admin/test", testAdd);

app.get("/gems", getAllItems);
app.get("/gemscarousel", getCarouselItems);
app.get("/gems/:id", getAllGemsByCat);
app.get("/collection/:id", getOneGem);

app.get("/cats", getCategories);
app.get("/subcats", getSubcats);
app.get("/colors", getColors);
app.get("/origins", getOrigins);
app.get("/sets", getSets);
app.get("/cuts", getCuts);
app.get("/treatments", getTreatments);
app.get("/clarities", getClarities);
app.get("/avails", getAvails);
app.get("/sales", getSales);

app.patch("/admin/editfield/:type", editOneField);
app.patch("/admin/deleteCert/:id", deleteCert);

app.delete("/admin/deleteImg/:id", deleteImg);
app.delete("/admin/deleteItem/:id", deleteItem);

/*RUSSIAN VERSION */

app.get("/ru/gems", ruGetAllItems);
app.get("/ru/gemscarousel", ruGetCarouselItems);
app.get("/ru/gems/:id", ruGetAllGemsByCat);
app.get("/ru/collection/:id", ruGetOneGem);

app.get("/ru/cats", ruGetCategories);
app.get("/ru/subcats", ruGetSubcats);
app.get("/ru/colors", ruGetColors);
app.get("/ru/origins", ruGetOrigins);
app.get("/ru/sets", ruGetSets);
app.get("/ru/cuts", ruGetCuts);
app.get("/ru/treatments", ruGetTreatments);
app.get("/ru/clarities", ruGetClarities);
app.get("/ru/avails", ruGetAvails);
app.get("/ru/sales", ruGetSales);

app.listen(process.env.PORT || 8081, (err) => {
  if (err) {
    return console.log("SERVER DOWN");
  } else {
    return console.log("Server works");
  }
});
