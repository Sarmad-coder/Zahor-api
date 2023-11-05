var express = require('express');
var router = express.Router();
let Catagory = require("../models/catagory")
let SubCategory = require("../models/subCategory")
let multer = require("multer")


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
  { name: 'categoryImage', maxCount: 1 },
]), async (req, res) => {
  console.log(req.body)
  console.log(req.files)
  if (req.files.categoryImage) {
    req.body.categoryImage = req.files.categoryImage[0].originalname;
  }

  let currentDate = new Date();
  let timeZoneOffsetInHours = currentDate.getTimezoneOffset() / 60;
  let pakistanOffsetInHours = 5;  // Pakistan Standard Time is UTC+5
  let offset = pakistanOffsetInHours - timeZoneOffsetInHours;
  currentDate.setHours(currentDate.getHours() + offset);
  req.body.createdAt = currentDate.toLocaleString();
  console.log(req.body)
  let category = new Catagory(req.body)
  await category.save()
  res.json(category)
})
router.get("/getAll", async (req, res) => {
  let user = await Catagory.find()
  res.json(user)
})
router.delete("/delteByID", async (req, res) => {
  console.log(req.query.id)
  let category = await Catagory.findByIdAndDelete(req.query.id)
  await SubCategory.deleteMany({ categoryID: req.query.id })
  res.json(category)
})
router.get("/getById", async (req, res) => {
  console.log(req.query.id)
  let category = await Catagory.findById(req.query.id)
  res.json(category)
})
router.put("/updateById", upload.fields([
  { name: 'categoryImage', maxCount: 1 },
]), async (req, res) => {
  if (req.files) {
    if (req.files.categoryImage) {

      req.body.categoryImage = req.files.categoryImage[0].originalname;
    }
  }
  console.log(req.files)
  console.log(req.body)
  Catagory.findByIdAndUpdate(req.body.id, req.body).then(
    (x) => res.json(x), // success
    (e) => res.status(400).send(e) // error
  );
})


module.exports = router;
