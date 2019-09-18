require("dotenv").config();

const express = require("express");
const cors = require("cors");
const packageJson = require("./package.json");
const routes = require("./routes");

const {
  env: {
    PORT
  }
} = process;

const app = express();

app.use(cors());

app.use("/api", routes);

app.listen(PORT, () =>
  console.log(
    `${packageJson.name} ${packageJson.version} up and running on port ${PORT}`
  )
);