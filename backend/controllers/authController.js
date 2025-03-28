const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/usersModel');
const bcrypt = require('bcryptjs');

dotenv.config();

const secret_key = process.env.SECRET_KEY;
if(!secret_key){
    throw new Error("Secret key is not defined");
    
}

//http://localhost:3000/api/register
module.exports.register = async (req, res, next) => {
    try {
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if (password !== confirmPassword){
            return res.status(400).json({error: "Passwords do not match"});
        }

        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: password,
        });

        //await newUser.save(); redundant since create already saves the user

        res.status(201).json({
            message: 'Registration successful',
            data: newUser
        });


    } catch (err) {
        next(err);
    }
}

//http://localhost:3000/api/login
module.exports.login = async (req, res, next) => {
    try {
        const {usernameOrEmail, password} = req.body;
        const user= await User.findOne({    // we are checking whether correct username or email had been entered
            $or: [
                { username: usernameOrEmail },
                { email: usernameOrEmail },
            ],
        });
       
        if(!user){
            return res.status(401).json({error: "wrong credentials"});
        }

        const comparePassword = await bcrypt.compare( password, user.password);
       
        if(!comparePassword){
            return res.status(401).json({error: "wrong credentials"});
        }

        const token = jwt.sign({userID: user._id}, secret_key, {
            expiresIn: '1h',
        });
        res.status(200).json({token});

    } catch (error) {
       next(error);
    }
}


