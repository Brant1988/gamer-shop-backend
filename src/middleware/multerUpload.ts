import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "build", "static"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split(".")[0] + "-" + Date.now() + ".jpg");
  },
});

export const upload = multer({ storage: storage });
