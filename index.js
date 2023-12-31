const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { getDateFromDataBase } = require("./src/models/local_db");
const { apiRouter } = require("./src/server/server");


const app = express();
const port = process.env.PORT | 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: true,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  const now = new Date();
  const time = now.toLocaleTimeString();
  console.log(`${time} --- New request ${req.method}, on path ${req.path}`);
  next();
});





app.get("/", async (req, res) => {
  await getDateFromDataBase(req, res);
});

apiRouter(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
