var express = require('express');
var router = express.Router();
const axios = require('axios');
// const { Vonage } = require('@vonage/server-sdk')
const accountSid = 'AC2e2c87645c7e78fe324b9a25be1eb9af';
const authToken = '4209dd67030aa0dc5e48f77637d68d8a';
const client = require('twilio')(accountSid, authToken);

// const vonage = new Vonage({
//   apiKey: "72fcd04d",
//   apiSecret: "qLSri6J0kkZ1OpcZ"
// })







const nodemailer = require('nodemailer');






router.post("/sendOTP", async (req, res) => {
  // const from = "Al-Zahor"
  // const to = "+923343603636"
  // const text = 'Your OTP Code for Meta Scrap is 12354'

  // async function sendSMS() {
  //     await vonage.sms.send({to, from, text})
  //         .then(resp => { console.log('Message sent successfully'); console.log(resp); })
  //         .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
  // }

  // sendSMS();


  function generateRandomNumbers() {
    var min = 1; // Minimum value
    var max = 9; // Maximum value
    var count = 5; // Number of random numbers to generate
    var numbers = [];

    for (var i = 0; i < count; i++) {
      var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.push(randomNumber);
    }

    return numbers;
  }

  // Example usage
  let otp = ""
  var randomNumbers = generateRandomNumbers();
  randomNumbers.forEach((e) => {
    otp += e.toString()
  })
  console.log(randomNumbers);

  // const data = {
  //   messages: [
  //     {
  //       channel: 'sms',
  //       to: req.body.phone,
  //       content: 'Your OTP for Meta-Scrap is '+otp
  //     },
  //   ],
  // };






  client.messages
    .create({
      body: 'Your OTP for Meta-Scrap is ' + otp,
      from: '+12392042095',
      to: req.body.phone
    })
    .then(message => console.log(message.sid));

  res.json({ status: "success", data: otp })


  // axios
  //   .post('https://platform.clickatell.com/v1/message', data, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: '9Kgvdlh8RDux9o7mwri8Qw==',
  //     },
  //   })
  //   .then((response) => {
  //     console.log('success');
  //     res.json({status:"success",data:otp})
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     res.json(error)
  //   });
})


const transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',
  port: 465, // Correct port for SSL/TLS
  secure: true, // Use SSL/TLS
  auth: {
    user: 'admin@azahscrap.com',
    pass: 'LightHouse098team',
  },
});


router.post("/sendMail", async (req, res) => {
  

  const mailOptions = {
    from: 'admin@azahscrap.com',
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