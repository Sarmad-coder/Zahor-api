let mogoose = require("mongoose")

let adminSchema = mogoose.Schema({
  fcmToken:String,
  username: String,
  password: String,
  profile:String,
  logo:String
})
let Admin = mogoose.model("admin", adminSchema)
module.exports = Admin;
