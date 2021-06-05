const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    callback(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

// app.use(bodyParser.urlencoded({ extended: false })); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
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
app.use("/auth", authRoutes);

// Errors handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });

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
