let mongoose = require("mongoose");

let categorySchema = mongoose.Schema({
  
  categoryName: String,
  categoryImage: String,
  createdAt:String
})
let Catagory = mongoose.model("catagory", categorySchema)
module.exports = Catagory;
