let mongoose = require("mongoose");

let adminNotificationSchema = mongoose.Schema({
  
  title: String,
  description: String,
  createdAt:String
})
let adminNotificaton = mongoose.model("adminNotification", adminNotificationSchema)
module.exports = adminNotificaton;
