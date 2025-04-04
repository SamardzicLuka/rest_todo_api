const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username required'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        validate: [isEmail, 'invalid Email'],
        required: [true, 'Email required'],
        unique: true,
    }, 
    taskList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tasks', // Reference to the tasks model
        }
    ],
});

userSchema.pre('save', async function(next){
    try {

        // without this, pre-save hook will prevent us from updating our tasklist
        // since it checks whether the username already exists
        if(this.isModified('taskList')){
            return next();
        }

        const existingUserByUsername = await this.constructor.findOne({ //mongoose.models.User.findOne({
            username: this.username
        });
        if(existingUserByUsername){
            return next(new Error('Username already taken'));
        }

        const existingUserByEmail = await this.constructor.findOne({ //mongoose.models.User.findOne({
            email: this.email
        });
        if(existingUserByEmail){
            return next(new Error('Email already in use'));
        }

        if (!this.isModified('password')) {
            return next();
        }

        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);


        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error('Password comparison failed');
    }
};

const usersModel = mongoose.model('users', userSchema);

module.exports = usersModel;


