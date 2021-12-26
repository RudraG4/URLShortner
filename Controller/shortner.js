require('dotenv').config();
const { nanoid } = require('nanoid');
const validUrl = require('valid-url');
const express = require('express');
const mongoutil = require('../DB/mongo-util');
const { ShortURL } = require('../DB/Model/models');
const routers = express.Router();
const baseUrl = process.env.BASE_URL;

routers.post("/", async function(req, res) {
  var originalURL = req.body.url;
  if (!baseUrl) {
    return res.json({ "error": "Base URL not configured" });
  }
  if (!validUrl.isWebUri(baseUrl)) {
    return res.json({ "error": "Invalid Base URL" });
  }
  if (!validUrl.isWebUri(originalURL)) {
    return res.json({ "error": "invalid url" });
  }
  let connnection;
  try {
    connection = mongoutil.connect();
    const url = await ShortURL.findOne({ "original_url": originalURL }).select('original_url short_url').exec();
    if (url) {
      return res.json(url);
    }
    const newUrl = { "original_url": originalURL, "short_url": nanoid(8) };
    await new ShortURL(newUrl).save();
    res.json(newUrl);
  } catch (e) {
    res.status(500).json({ "error": "Server error" });
  } finally {
    if (connection) {
      connection.close();
    }
  }
});

routers.get("/:short_url", async function(req, res) {
  var shortURL = req.params.short_url;
  if (!shortURL) {
    res.json({ "error": "invalid url" });
  }
  const connection = mongoutil.connect();
  const url = await ShortURL.findOne({ "short_url": shortURL }).select('original_url short_url').exec();
  connection.close();
  if (url) {
    console.log("Redirecting..." + url.original_url);
    return res.redirect(url.original_url);
  }
  return res.status(404).json('No URL Found')
});

module.exports = routers;