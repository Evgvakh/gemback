import express from "express";
import cors from "cors";

import {
  getAllItems,
  getAllGemsByCat,
  getOneGem,
  getCarouselItems,
  getGlossItems,
  getOneGlossItem,
  getDescription,
} from "./controllers/itemsController.js";
import {
  addCertificate,
  addImgs,
  addItem,
  deleteCert,
  deleteImg,
  deleteItem,
  editOneField,
  addFieldToTable,
  editFieldOfTable,
  deleteFieldFromTable,
  addGlossItem,
  deleteGlossItem,
  editGlossItem,
  addGlossImgs,
  deleteGlossImg,
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

import { register, login } from './controllers/userController.js';

import { uploadCert, uploadImg, uploadVideo, uploadGlossImg } from "./multerStorage/index.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads/img", express.static("uploads/img"));
app.use("/uploads/video", express.static("uploads/video"));
app.use("/uploads/certificates", express.static("uploads/certificates"));
app.use("/uploads/logo", express.static("uploads/logo"));
app.use("/uploads/assets", express.static("uploads/assets"));
app.use("/uploads/gloss", express.static("uploads/gloss"));


app.post("/upload/img", uploadImg.array("img"), (req, res) => {
  let imagesURLs = [];
  for (let i of req.files) {
    imagesURLs.push(`uploads/img/${i.originalname}`);
  }
  res.json(imagesURLs);
});

app.post("/upload/glossImg", uploadGlossImg.array("img"), (req, res) => {
  let imagesURLs = [];
  for (let i of req.files) {
    imagesURLs.push(`uploads/gloss/${i.originalname}`);
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
app.post("/admin/addGlossImgs", addGlossImgs);
app.post("/admin/addCertificate", addCertificate);
app.post("/admin/addfield/:type", addFieldToTable);
app.post("/gloss/addItem", addGlossItem);

app.get("/gems", getAllItems);
app.get("/gemscarousel", getCarouselItems);
app.get("/gems/:id", getAllGemsByCat);
app.get("/collection/:id", getOneGem);
app.get("/descr/:table/:id", getDescription);

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

app.get("/gloss", getGlossItems);
app.get("/gloss/:id", getOneGlossItem);

app.patch("/admin/editfield/:type", editOneField);
app.patch("/admin/deleteCert/:id", deleteCert);
app.patch("/admin/edittablefield/:type/:field", editFieldOfTable);
app.patch("/gloss/editItem", editGlossItem);

app.delete("/admin/deleteImg/:id", deleteImg);
app.delete("/admin/deleteItem/:id", deleteItem);
app.delete("/admin/deletefield/:type/:id", deleteFieldFromTable);
app.delete("/admin/deleteGlossItem/:id", deleteGlossItem);
app.delete("/admin/deleteGlossImg/:id", deleteGlossImg);

app.post("/user/register", register);
app.post("/user/login", login);

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

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("SERVER DOWN");
  } else {
    return console.log("Server works");
  }
});
