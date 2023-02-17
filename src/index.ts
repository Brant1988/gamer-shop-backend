import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import { errorMiddleware } from "./middleware/errorHandler.js";
import { sequelize } from "./database/index.js";
import fs from "fs";

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(express.static(path.join(process.cwd(), "static")));
app.use(errorMiddleware);

const start = async () => {
  try {
    if (!fs.existsSync(path.join(process.cwd(), "static"))) {
      fs.mkdirSync(path.join(process.cwd(), "static"));
    }

    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(parseInt(PORT as string) || 3001, () =>
      console.log(`Server started on port ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
