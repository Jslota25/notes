//JSON Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const uuid = require("uuid");

//Async functions
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Sets up Express App
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Server is listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });

//Sends user to notes page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
  });

// Sends user to index page
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });