var express = require('express');
var router = express.Router();
let SubCatagory = require("../models/subCategory")
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

router.post("/create",upload.fields([
  { name: 'subCategoryImage', maxCount: 1 },
]) , async (req, res) => {
  console.log(req.body)
  console.log(req.files)
  req.body.subCategoryImage = req.files.subCategoryImage[0].originalname;
  const currentDate = new Date();
  req.body.createdAt = currentDate.toLocaleString();
  console.log(req.body)
    let subCatagory = new SubCatagory(req.body)
   await subCatagory.save()
    res.json(subCatagory)
})
router.get("/getAll", async (req, res) => {
  let user = await SubCatagory.find()
  res.json(user)
})
router.get("/getById",async (req,res)=>{
  console.log(req.query.id)
  let subCatagory=await SubCatagory.findById(req.query.id)
  res.json(subCatagory)
})
router.delete("/delteByID",async (req,res)=>{
  console.log(req.query.id)
  let subCatagory=await SubCatagory.findByIdAndDelete(req.query.id)
  res.json(subCatagory)
})
router.get("/getByCategoryId",async (req,res)=>{
  console.log(req.query.categoryID)
  let subCatagory=await SubCatagory.find(req.query)
  res.json(subCatagory)
})

router.put("/updateById",upload.fields([
  { name: 'subCategoryImage', maxCount: 1 },
]),async (req,res)=>{
  if (req.files) {
    if (req.files.subCategoryImage) {
      
      req.body.subCategoryImage = req.files.subCategoryImage[0].originalname;
    }
  }
  console.log(req.files)
  console.log(req.body)
  SubCatagory.findByIdAndUpdate(req.body.id, req.body).then(
    (x) => res.json(x), // success
    (e) => res.status(400).send(e) // error
  );
})

module.exports = router;
