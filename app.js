const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const feedRoutes = require("./routes/feed");

const app = express();

// app.use(bodyParser.urlencoded({ extended: false })); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use("/images", express.static(path.join(__dirname, "images")));

// CORS Problem solve
app.use((req, res, next) => {
  // client
  res.setHeader("Access-Control-Allow-Origin", "*");
  // http method
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  // headers
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

// Routes
app.use("/feed", feedRoutes);

// Errors handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });

  // next();
});

mongoose
  .connect(
    "mongodb+srv://zattwine:q1lm5aP1EQbh1GpV@cluster0.c5muj.mongodb.net/messages?authSource=admin&replicaSet=atlas-uueejk-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then((result) => {
    console.log("CONNECTED!");
    app.listen(8080);
  })
  .catch((err) => console.log(err));
