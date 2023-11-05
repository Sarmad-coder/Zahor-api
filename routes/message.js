var express = require('express');
var router = express.Router();
let Message=require("../models/message")

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

router.get("/getAll",async (req,res)=>{
    let messages= await Message.find()
    res.json(messages)
})

router.post('/upload', upload.single("file"),async (req, res) => {
    // Access the uploaded file via req.file
    const { originalname, path, mimetype } = req.file;
    console.log('Received file:', originalname, path, mimetype);
    res.json({status:"success",data:"http://143.110.250.35:3002/images/"+originalname})
  })

module.exports = router;