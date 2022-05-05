import "dotenv/config";
import express from "express";
import cors from "cors";
import compression from "compression";

import { DatabaseConnect } from "./db/index.js";
import routes from "./routes/asset.js";
import LoggerService from "./logger/LoggerService.js";

const { NODE_LOCAL_PORT: port } = process.env;

const app = express();

app.use(
  cors({
    origin: [
      "https://abcdarab.com",
      "https://arabgatewallet.com",
      "https://arabnetwork.org",
    ],
    optionsSuccessStatus: 200,
  })
);
app.use(compression());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/asset", routes);

app.listen(port, () => {
  LoggerService.info(`Server listening on port ${port}`);
  DatabaseConnect();
});

export default app;
