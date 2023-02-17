import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "/static";
    if (!fs.existsSync(process.cwd() + dir)) {
      fs.mkdirSync(process.cwd() + dir);
    }
    cb(null, path.join(process.cwd() + "/static"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split(".")[0] + "-" + Date.now() + ".jpg");
  },
});

export const upload = multer({ storage: storage });
