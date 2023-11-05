let mogoose = require("mongoose")

let userSchema = mogoose.Schema({
  fcmToken: { type: String, default: '' },
  name: { type: String, default: '' },
  userImage: { type: String, default: '' },
  email: { type: String, default: '' },
  company: { type: String, default: '' },
  tradeLicenseNo: { type: String, default: '' },
  trnNumber: { type: String, default: '' },
  emiratesIdFront: { type: String, default: '' },
  emiratesIdBack: { type: String, default: '' },
  emiratesIdExpiryDate: { type: String, default: '' },
  tradeLicense: { type: String, default: '' },
  tradeLicenseExpiryDate: { type: String, default: '' },
  taxNumber: { type: String, default: '' },
  phoneNo: { type: String, default: '' },
  status: { type: String, default: 'pending' },
});

let User = mogoose.model("user", userSchema)
module.exports = User;
