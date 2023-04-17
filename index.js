import express from "express";
import multer from "multer";
import cors from "cors";

import {
  getAllItems,
  getAllGemsByCat,
  getOneGem,
  getCarouselItems,
} from "./controllers/itemsController.js";

import { addItem } from "./controllers/adminController.js";
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
  getSales
} from "./controllers/fetchDBFields.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads/img", express.static("uploads/img"));
app.use("/uploads/video", express.static("uploads/video"));
app.use("/uploads/certificates", express.static("uploads/certificates"));
app.use("/uploads/logo", express.static("uploads/logo"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/img");
  },

  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("img"), (req, res) => {
  res.json({
    url: `uploads/img/${req.file.originalname}`,
  });
});

app.post('/admin/add', addItem);

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

app.listen(process.env.PORT || 8081, (err) => {
  if (err) {
    return console.log("SERVER DOWN");
  } else {
    return console.log("Server works");
  }
});
