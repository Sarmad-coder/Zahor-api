const mongoose = require('mongoose');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var categoryRouter = require('./routes/catagory');
var usersRouter = require('./routes/users');
var subCategoryRouter = require('./routes/subCatagory');
var adminRouter = require('./routes/admin');
var adminNotification = require('./routes/adminNotification');
var otpRouter = require('./routes/otpService');
var { tiketRouter, messageSocket } = require('./routes/ticket');
const messageRouter=require("./routes/message")
const http = require("http")
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ limit: '150mb', extended: false }));
app.use(cors());


mongoose
  .connect("mongodb://127.0.0.1:27017/azScrapDB")
  .then(() => console.log('Mongodb connected'))
  .catch((error) => {
    console.log('Mongodb connection failed. exiting now...');
    console.error(error);
    process.exit(1);
  });

app.use('/subCategory', subCategoryRouter);
app.use('/category', categoryRouter);
app.use('/admin', adminRouter);
app.use('/otp', otpRouter);
app.use('/adminNotification', adminNotification);
app.use('/user', usersRouter);
app.use('/ticket', tiketRouter);
app.use('/message', messageRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// let Admin = require("./models/admin")
// const bcrypt = require('bcrypt')
// const salt = 10

// async function createAdmin() {
//     let password = await bcrypt.hash("Admin@123", salt); // Salt is now 10
//     let username="admin"
//     let admin = new Admin({ "username":username, "password":password});
//     const result = await admin.save(); // Use Mongoose's save method
//     console.log("Admin created with id: ", result._id);
//   }

// createAdmin()

module.exports = app;
