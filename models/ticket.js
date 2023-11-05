// ticket.js
let mongoose = require("mongoose");

let ticketSchema = mongoose.Schema({
  categoryID: { type: mongoose.Schema.Types.ObjectId, ref: "catagory" },
  subCategoryID: { type: mongoose.Schema.Types.ObjectId, ref: "subCatagory" },
  discription: String,
  weight: String,
  weightType: String,
  weightUnit: String,
  price: String,
  contactNo: String,
  scrapImages: Array,
  cityName: String,
  tid: String,
  addressDetails: String,
  userID: String,
  offer: { type: String, default: "" },
  status: String,
  createdAt: String,
});

let Ticket = mongoose.model("ticket", ticketSchema);
module.exports = Ticket;

