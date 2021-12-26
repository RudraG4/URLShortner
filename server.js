require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use("/Public", express.static(__dirname + "/Public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const shortner = require("./Controller/shortner");

if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/Views/index.html");
});

app.use("/api/shorturl", shortner);

const listener = app.listen(process.env.PORT || 4500, function() {
  console.log("UrlShortner running on port " + listener.address().port);
});