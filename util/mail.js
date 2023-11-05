const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',
  port: 465, // Correct port for SSL/TLS
  secure: true, // Use SSL/TLS
  auth: {
    user: 'admin@azahscrap.com',
    pass: 'LightHouse098team',
  },
});

const sendMail=(email,subject,text) => {
    const mailOptions = {
      from: 'admin@azahscrap.com',
        to: email,
        subject: subject,
        text: text
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
}

module.exports = {
    sendMail
};