//JSON Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const uuid = require("uuid");

//Async Functions
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

// Reads json file and returns notes
app.get("/api/notes", function (req, res) {
    readFileAsync("./db/db.json", "utf8")
    .then (data => {
      let notesJSON = JSON.parse(data)
        res.json(notesJSON)
      })
    });

//Adds note to json file and returns new note to the user
app.post("/api/notes", function (req, res) {
    let newNote = req.body
    let id = uuid.v4()
    newNote.id = id
    readFileAsync("./db/db.json", "utf8").then (data =>{
      let notesJSON = JSON.parse(data);
      notesJSON.push(newNote);
      writeFileAsync("./db/db.json", JSON.stringify(notesJSON)).then(() => {
        res.json(newNote);
      });
    });
  });

// Deletes note from json file and returns new note to the user
app.delete("/api/notes/:id", function (req, res) {
    readFileAsync("./db/db.json", "utf8").then (data =>{
      let notesJSON = JSON.parse(data);
      let remainNotes = notesJSON.filter(note => note.id !== req.params.id);
      notesJSON = remainNotes;
      writeFileAsync("./db/db.json", JSON.stringify(notesJSON)).then(() => {
        res.json(notesJSON);
      });
    });
  });
  