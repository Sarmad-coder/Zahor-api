var express = require('express');
var router = express.Router();
let Ticket = require("../models/ticket")
let User = require("../models/user")
let Admin = require("../models/admin")
const { notify } = require("../util/notifications")
let Catagory = require("../models/catagory")
let SubCatagory = require("../models/subCategory")
let multer = require("multer")
let { sendSMS } = require("../util/sms")
let { sendMail } = require("../util/mail")


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

router.post("/create", upload.array('scrapImages', 10), async (req, res) => {
  console.log(req.body)
  console.log(req.files)
  req.body.scrapImages = req.files.map(file => file.originalname);
  const currentDate = new Date();
  req.body.createdAt = currentDate.toLocaleString();
  console.log(req.body)
  let ticket = new Ticket(req.body)


  let admin = await Admin.find()
  admin = admin[0]

  let user = await User.findById(req.body.userID)
  let body = "You have successfully created a ticket"
  // sendSMS(body, user.phoneNo)
  notify(admin.fcmToken, "New Ticket", `A user with phone: ${user.phoneNo} has created a new ticket`)
  if (user.status == "approve" && user.email) {
    sendMail(user.email, "New Ticket", "You have successfully created a new ticket")
  }
  await ticket.save()
  res.json(ticket)
})
router.get("/getAll", async (req, res) => {
  let user = await Ticket.find()
  res.json(user)
})
router.get("/getById", async (req, res) => {
  console.log(req.query.id)
  let ticket = await Ticket.findById(req.query.id)
  res.json(ticket)
})
router.get("/getByuserID", async (req, res) => {
  console.log(req.query.id)
  // let ticket = await Ticket.find(req.query).populate("categoryID").populate("subCategoryID")
  // res.json(ticket)

  const matchedTickets = await Ticket.find().populate("categoryID").populate("subCategoryID");

  // Use MongoDB aggregation to add sequential indexes to the matched tickets
  const formattedTickets = matchedTickets.map((ticket, index) => ({
    index: index + 1,
    ...ticket.toObject(),
  }));
  let ticket = formattedTickets.filter(ticket => ticket.userID === req.query.userID)
  res.json(ticket);
})
router.delete("/delteByID", async (req, res) => {
  console.log(req.query.id)
  let ticket = await Ticket.findByIdAndDelete(req.query.id)
  res.json(ticket)
})
router.put("/updateById", async (req, res) => {
  let ticket = Ticket.findById(req.body.id)
    let user = await User.findById(ticket.userID)
  // if (req.body.status == 'Under Inspection') {
    
  //   let body = "You ticket is Under Inspection "
  //   sendSMS(body, user.phoneNo)
  // }
  if (req.body.status &&user.status == 'approve'&& user.email) {
    sendMail(user.email,"Ticket Status","your ticket status has been changed to "+req.body.status)
  }

  if (req.body.offer &&user.status == 'approve'&& user.email) {
    sendMail(user.email,"Price Quoted","Admin has quoted the price against your ticket")
  }
  if (req.body.price &&user.status == 'approve'&& user.email) {
    sendMail(user.email,"Quotation Accepted","You have successfully accepted the price")
  }
  Ticket.findByIdAndUpdate(req.body.id, req.body).then(
    (x) => res.json(x), // success
    (e) => res.status(400).send(e) // error
  );
})

// module.export = socketFunction(io){
//   io.on
// }
router.post('/upload', upload.single('pdf'), async (req, res) => {
  // Access the uploaded file via req.file
  const { originalname, path, mimetype } = req.file;
  console.log('Received PDF:', originalname, path, mimetype);
  res.json({ status: "success", data: "http://143.110.250.35:3002/images/" + originalname })
})

module.exports = { tiketRouter: router };
