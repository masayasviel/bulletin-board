const functions = require("firebase-functions");
const express = require("express");

const server = require("./lib/server");

const app = express();

app.use("/api", server);

exports.app = functions.https.onRequest(app);