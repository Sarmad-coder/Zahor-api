var express = require('express');
var router = express.Router();
let User = require("../models/user")
let Ticket = require("../models/ticket")
let Admin = require("../models/admin")
const { notify } = require("../util/notifications")
let multer = require("multer")
var moment = require('moment');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = './public/images'

    cb(null, path)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage, limits: { fieldSize: 20971520 } })

router.post("/create", upload.fields([
  { name: 'emiratesIdFront', maxCount: 1 },
  { name: 'emiratesIdBack', maxCount: 1 },
  { name: 'tradeLicense', maxCount: 1 },
  { name: 'taxNumber', maxCount: 1 },
  { name: 'userImage', maxCount: 1 }
]), async (req, res) => {
  try {
    console.log(req.files)
    if (req.files) {
      if (req.files.emiratesIdFront) {

        req.body.emiratesIdFront = req.files.emiratesIdFront[0].originalname;
      }
      if (req.files.userImage) {

        req.body.userImage = req.files.userImage[0].originalname;
      }
      if (req.files.emiratesIdBack) {

        req.body.emiratesIdBack = req.files.emiratesIdBack[0].originalname;
      }
      if (req.files.tradeLicense) {

        req.body.tradeLicense = req.files.tradeLicense[0].originalname;
      }
      if (req.files.taxNumber) {

        req.body.taxNumber = req.files.taxNumber[0].originalname;
      }
    }
    req.body.emiratesIdExpiryDate = moment(req.body.emiratesIdExpiryDate).format("YYYY-MM-DD")
    req.body.tradeLicenseExpiryDate = moment(req.body.tradeLicenseExpiryDate).format("YYYY-MM-DD")
    console.log(req.body)
    let user = new User(req.body)
    await user.save()

    let admin = await Admin.find()
    admin = admin[0]

    notify(admin.fcmToken, "New Registration", `A new user has been registered`)
    res.json(user)
  } catch (err) {
    console.log(err)
  }
})
router.get("/getAll", async (req, res) => {
  let user = await User.find()
  console.log("user getAll")
  res.json(user)
})
router.get("/getById", async (req, res) => {
  console.log(req.query.id)
  try {
    let user = await User.findById(req.query.id)
    if (user) {

      res.json(user)
    } else {
      res.json({ status: false, data: {} })
    }
  } catch (error) {
    console.log(error)
    res.json({ status: false })
  }

})
router.delete("/delteByID", async (req, res) => {
  console.log(req.query.id)

  let user = await User.findByIdAndDelete(req.query.id)
  await Ticket.deleteMany({ userID: req.query.id })
  res.json(user)
})
router.get("/getByNo", async (req, res) => {
  console.log(req.query.phoneNo)
  let user = await User.find(req.query)
  if (user[0]) {

    res.json(user)
  } else {
    res.json(false)
  }
})
router.put("/updateById", upload.fields([
  { name: 'emiratesIdFront', maxCount: 1 },
  { name: 'emiratesIdBack', maxCount: 1 },
  { name: 'tradeLicense', maxCount: 1 },
  { name: 'taxNumber', maxCount: 1 },
  { name: 'userImage', maxCount: 1 }
]), async (req, res) => {
  if (req.files) {
    if (req.files.emiratesIdFront) {

      req.body.emiratesIdFront = req.files.emiratesIdFront[0].originalname;
    }
    if (req.files.userImage) {

      req.body.userImage = req.files.userImage[0].originalname;
    }
    if (req.files.emiratesIdBack) {

      req.body.emiratesIdBack = req.files.emiratesIdBack[0].originalname;
    }
    if (req.files.tradeLicense) {

      req.body.tradeLicense = req.files.tradeLicense[0].originalname;
    }
    if (req.files.taxNumber) {

      req.body.taxNumber = req.files.taxNumber[0].originalname;
    }
    if (req.body.email) {
      let admin = await Admin.find()
      admin = admin[0]

      notify(admin.fcmToken, "Requested for verification", `A user has requested for verfication`)
    }

    if (req.body.status == "approve") {
      let user = await User.findById(req.body.id)
      let body = "You are verified from the admin "
      sendSMS(body, user.phoneNo)
    }
  }
  console.log(req.files)
  console.log(req.body)
  User.findByIdAndUpdate(req.body.id, req.body).then(
    (x) => res.json(x), // success
    (e) => res.status(400).send(e) // error
  );
})

module.exports = router;
