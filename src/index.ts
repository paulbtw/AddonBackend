require("dotenv").config();
import express from "express";
import { config } from "./config/ormconfig";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import cors from "cors";
import router from "./routes";
import { errorHandler } from "./util/errorHandler";

createConnection(config).then((connection) => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());

  app.use("/api", router);

  app.use(errorHandler);

  const port = process.env.NODE_ENV === "production" ? 80 : 5000;
  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
});
