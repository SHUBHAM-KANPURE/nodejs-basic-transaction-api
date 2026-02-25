const express = require("express");
const http = require("http");
const connectDB = require("./config/db");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 1000;

app.get("/", (req, res) => {
  res.send("App is running");
});

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

const start = async () => {
  app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
  });
  connectDB();
};
start();
