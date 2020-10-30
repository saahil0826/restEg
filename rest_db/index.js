var express = require("express");
var app = express();
var port = 4000; //optional
var bodyParser = require('body-parser');
var path = require('path');
const { v4: uuid } = require("uuid");
methodOverride = require("method-override");
var mongoose = require("mongoose");
const Product = require('./model/product');


app.use(express.static(path.join(__dirname, 'public'))); // to serve the contents of the public directory, the public dir is where css and other assets lives
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '/views'));
app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({extended:true})); // has to be npm install body-parser --save


mongoose
  .connect("mongodb://localhost:27017/movieApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connection open");
  })
  .catch(err => {
    console.log(err);
  });
// routes
// '/' => "HI there!" {root path}
app.get("/", function(req, res){
  res.redirect('/products')
});

app.get("/products", async (req, res)=>{
  const products = await Product.find({})
  res.render("home", {products});
});

app.get("/products/new", function(req, res) {
  res.render("new");
});

app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});

app.get("/products/:id", async (req, res)=>{
  const { id } = req.params;
  const product = await Product.findById(id)
  res.render("details", {product});
});

app.get("/products/:id/edit", async(req, res) =>{
  const { id } = req.params;
  const product = await Product.findById(id)
  res.render("edit", {product});
});

app.put("/products/:id", async(req, res)=> {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {new:true, runValidators:true})
  res.redirect(`/products/${product._id}`);
});

app.delete("/products/:id", async(req, res)=> {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});


app.get('*', function(req, res){
  res.send("page does not exist!");
});

app.listen(port, function() {
  console.log(`now listening on port ${port}`);
});
