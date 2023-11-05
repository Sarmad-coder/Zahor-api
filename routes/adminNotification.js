var express = require('express');
var router = express.Router();
let AdminNotification = require("../models/adminNotification")

let Admin = require("../models/admin")
let User=require("../models/user")
const {notify}=require("../util/notifications")


router.post("/create", async (req, res) => {
  console.log(req.body)
 
  let currentDate = new Date();
  let timeZoneOffsetInHours = currentDate.getTimezoneOffset() / 60;
  let pakistanOffsetInHours = 5;  // Pakistan Standard Time is UTC+5
  let offset = pakistanOffsetInHours - timeZoneOffsetInHours;
  currentDate.setHours(currentDate.getHours() + offset);
  req.body.createdAt = currentDate.toLocaleString();
  console.log(req.body)
  let adminNotification = new AdminNotification(req.body)
  // let admin = await Admin.find()
  // admin=admin[0]
  let user =await User.find()

  User.forEach(element => {
    notify(element.fcmToken, req.body.title, req.body.description)
  });
  
 
  await adminNotification.save()
  res.json(adminNotification)
})
router.get("/getAll", async (req, res) => {
  let user = await AdminNotification.find()
  res.json(user)
})
router.delete("/delteByID", async (req, res) => {
  console.log(req.query.id)
  let adminNotification = await AdminNotification.findByIdAndDelete(req.query.id)
  res.json(adminNotification)
})
router.get("/getById", async (req, res) => {
  console.log(req.query.id)
  let adminNotification = await AdminNotification.findById(req.query.id)
  res.json(adminNotification)
})
router.put("/updateById", async (req, res) => {
 
  console.log(req.body)
  AdminNotification.findByIdAndUpdate(req.body.id, req.body).then(
    (x) => res.json(x), // success
    (e) => res.status(400).send(e) // error
  );
})


module.exports = router;
