var mongoose = require("mongoose");
const Product = require('./model/product');

mongoose
  .connect(
    "mongodb://localhost:27017/farm",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("connection open");
  })
  .catch(err => {
    console.log(err);
  });


  Product.insertMany([
      { name: "apple", price: 1.00, category: 'fruit'},
      { name: "grapes", price: 3.00, category: 'fruit'},
      { name: "potato", price: 1.50, category: 'vegetable'},
      { name: "cheese", price: 2.50, category: 'dairy'}
    ])
    .then((result)=>{
console.log(result);
})
.catch((err)=>{
console.log(err);
})
