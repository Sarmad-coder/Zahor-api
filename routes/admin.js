var express = require('express');
var router = express.Router();
let Admin = require("../models/admin")
let jsonwebtoken = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const salt = 10


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



router.get("/getAll", async (req, res) => {
    let admin = await Admin.find()
    res.json(admin)
})


router.post("/login", async (req, res) => {
    try {
        let admin = await Admin.findOne({ username: req.body.username });
        console.log(admin)
        if (admin && (await bcrypt.compare(req.body.password, admin.password))) {

            jsonwebtoken.sign({
                id: admin._id
            }, "hello hello hello",
                {
                    expiresIn: "1D"
                },
                (err, token) => {
                    res.json(
                        {
                            status: "success",
                            token,
                            admin
                        }
                    )
                }
            )
            // res.json({status:"success",data:admin})
        } else {
            res.json({ status: "error", data: "Invalid username or password" })
        }
    } catch (error) {
        console.log(error)
    }

})

router.post("/session-check", (req, res) => {
    jsonwebtoken.verify(req.body.token, "hello hello hello", async (err, data) => {
        console.log(req.body.token)
        if (data) {
            // let user = users.find(user => user._id == data.meriID)
            let admin = await Admin.findById(data.id)
            if (admin) {
                res.json(true);
            } else {
                res.json(false);
            }

        } else {
            res.json(false)
        }
    })
})

router.put("/update", upload.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'logo', maxCount: 1 }
]), async (req, res) => {

    if (req.files) {
        if (req.files.profile) {

            req.body.profile = req.files.profile[0].originalname;
        }
        if (req.files.logo) {

            req.body.logo = req.files.logo[0].originalname;
        }
    }


    console.log(req.files)
    console.log(req.body)

    
        let admin = await Admin.findOne({ username: req.body.oldUsername });
        if (admin && (await bcrypt.compare(req.body.oldPassword, admin.password))) {
            if (req.body.password) {
                
                req.body.password = await bcrypt.hash(req.body.password, salt)
            }
            await Admin.findByIdAndUpdate(admin._id, req.body)
            res.json({ status: true, data: "successfully Change" })
        } else {
            res.json({ status: false, data: "Invalid username or password" })
        }
    


    // await Admin.findByIdAndUpdate(req.body.id, { fcm:req.body.token })
})
// router.put("/password",async (req,res)=>{
//     req.body.password = await bcrypt.hash(req.body.password, salt)
//     await Admin.findByIdAndUpdate(req.body.id, req.body)
//     res.json({ status: true, data: "successfully Change Fcm" })
// })

router.put("/fcmTokenUpdate",async (req,res)=>{
    console.log(req.body)
    let admin = await Admin.find()
  admin=admin[0]
    await Admin.findByIdAndUpdate(admin._id, req.body)
    res.json({ status: true, data: "successfully Change Fcm" })
})




router.get("/getById", async (req, res) => {
    console.log(req.query.id)
    let admin = await Admin.findById(req.query.id)
    res.json(admin)
})





module.exports = router;