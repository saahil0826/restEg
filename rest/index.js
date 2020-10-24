var express = require("express");
var app = express();
var port = 4000; //optional
var bodyParser = require('body-parser');
var path = require('path');
const { v4: uuid } = require("uuid");
methodOverride = require("method-override"),

app.use(express.static(path.join(__dirname, 'public'))); // to serve the contents of the public directory, the public dir is where css and other assets lives
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '/views'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));

let comments = [
  {
    id: uuid(),
    username: "Saahil",
    comment: ["how are your today"]
  },
  {
    id: uuid(),
    username: "Frank",
    comment: "very well thanks"
  },
  {
    id: uuid(),
    username: "Didier",
    comment: "march 2012"
  }
];

app.get("/", function(req, res){
  res.redirect("/comments");
});

app.get('/comments', function(req,res){
  res.render('home', {comments})
});

app.get("/comments/new", function(req, res) {
  res.render("new");
});

app.post("/comments", function(req, res) {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  res.redirect("/comments");
});

app.get("/comments/:id", function(req, res) {
  const { id } = req.params;
  //looking for comment thorugh an id
  const comment = comments.find(c => c.id === id);
  res.render("show", {comment:comment});
});

app.get("/comments/:id/edit", function(req, res) {
  const { id } = req.params;
  const comment = comments.find(c => c.id === id);
  res.render("edit", {comment});
});

app.patch("/comments/:id", function(req, res) {
  const { id } = req.params;
  const newComment = req.body.comment;
  const oldComment = comments.find(c => c.id === id);
  oldComment.comment = newComment;
  res.redirect("/comments");
});

app.delete("/comments/:id", function(req, res) {
  const { id } = req.params;
comments = comments.filter(c => c.id !== id)
  res.redirect("/comments");
});



app.listen(port, function() {
  console.log(`now listening on port ${port}`);
});
