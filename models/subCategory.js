let mogoose = require("mongoose")

let subCategorySchema = mogoose.Schema({
  
  subCategoryName: String,
  subCategoryImage: String,
  categoryID:String,
  createdAt:String,
  
})
let SubCatagory = mogoose.model("subCatagory", subCategorySchema)
module.exports = SubCatagory;
