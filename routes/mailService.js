var express = require('express');
var router = express.Router();
const axios = require('axios');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'viperwanted30@gmail.com',
    pass: 'Samia115'
  }
});
router.post("/sendMail", async (req, res) => {
  const mailOptions = {
    from: 'viperwanted30@gmail.com',
    to: 'sarmadawan35@gmail.com',
    subject: 'Hello, Nodemailer!',
    text: 'This is a test email sent using Nodemailer.'
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.json(error)
    } else {
      console.log('Email sent:', info.response);
      res.json(info.response)
    }
  });
})

module.exports = router;