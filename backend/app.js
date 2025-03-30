const express = require('express');
const connectDB  = require('./config/db.js');
const {urlencoded, json} = require('body-parser');
const usersRoutes = require('./routes/api/users');
const rateLimit = require('express-rate-limit');

const app = express();

app.use(json());
app.use(urlencoded({extended: false}));

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
});

app.use(limiter);
app.use('/api', usersRoutes);

//
app.use(function (error, req, res, next){
    const statusCode = error.status || 500;

    res.status(statusCode).json({
        error:{
            message: error.message,
            status: statusCode,
            stack: error.stack,
        },
    });
});

app.use(function (req,res,next){
    const error = new Error('Zahtev nije podrzan');
    error.status = 405;
    
    next(error)
})
connectDB();

module.exports = app;




