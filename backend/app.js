const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
//passport for authentication
const passport = require('passport');
// import API from routes 
const newsRoutes = require("./api/news");
const userRoutes = require("./api/users");

// use morgan for loging in develope mode
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// config header from requested client
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//Db Config
const DB = require('./config/keys').mongoURI;
//Connect to DB
mongoose
      .connect(DB,{ useNewUrlParser: true })
      .then(()=>console.log('DB connected.'))
      .catch(err=>console.log(err));
//Passport Middle
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);


// Routes which should handle requests
app.use("/news", newsRoutes);
app.use("/users", userRoutes);


// handle when request not found
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;