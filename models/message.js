let mogoose = require("mongoose")

let messageSchema = mogoose.Schema({
  
  message:String,
  sender:String,
  ticketID:String,
  offer:{ type: String, default: '' },
  agreement:{ type: String, default: '' },
  document:{ type: String, default: '' },
  company:{ type: String, default: '' },
  trnNumber:{ type: String, default: '' },
  tradeLicenseNo:{ type: String, default: '' },
  name:{ type: String, default: '' },
  phoneNo:{ type: String, default: '' },
  discription:{ type: String, default: '' },
  weightUnit:{ type: String, default: '' },
  condition:{ type: String, default: '' },
  image:{ type: String, default: '' },
  createdAt:String
  
})
let Message = mogoose.model("message", messageSchema)
module.exports = Message;