// Create web server
// Create a web server that listens to port 3000 and serves the following HTML file.
// The server should respond to the following endpoints:

// GET /comments - returns a list of comments from the database
// POST /comments - creates a new comment in the database
// PUT /comments/:id - updates the comment with the specified ID
// DELETE /comments/:id - deletes the comment with the specified ID

// The comments should be stored in a file called comments.json. You can use the fs module to read and write to this file.

// The comments should have the following structure:

// {
//   "comments": [
//     {
//       "id": 1,
//       "author": "John Doe",
//       "message": "Hello, world!"
//     },
//     {
//       "id": 2,
//       "author": "Jane Doe",
//       "message": "Hi, there!"
//     }
//   ]
// }

// The ID of a new comment should be one greater than the ID of the last comment in the list.

const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const COMMENTS_FILE = "comments.json";

app.get("/comments", (req, res) => {
  fs.readFile(COMMENTS_FILE, (err, data) => {
    if (err) {
      res.status(500).send("Error reading comments file");
    } else {
      const comments = JSON.parse(data);
      res.json(comments);
    }
  });
});

app.post("/comments", (req, res) => {
  fs.readFile(COMMENTS_FILE, (err, data) => {
    if (err) {
      res.status(500).send("Error reading comments file");
    } else {
      const comments = JSON.parse(data);
      const newComment = {
        id: comments.comments.length > 0 ? comments.comments[comments.comments.length - 1].id + 1 : 1,