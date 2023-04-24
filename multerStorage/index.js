import multer from "multer";

const storageImg = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/img");
  },

  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
export const uploadImg = multer({ storage: storageImg });

const storageCert = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/certificates");
  },

  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
export const uploadCert = multer({ storage: storageCert });

const storageVideo = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/video");
  },

  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
export const uploadVideo = multer({ storage: storageVideo });
