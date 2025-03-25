import mongoose from 'mongoose';
import { isEmail } from 'validator';
import bcrypt from 'bcryptjs';

const SALT_WORK_FACTOR = 10;
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username required'],
        unique: true,
    },
    password: {
        type: String,
        match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        required: true,
    },
    email: {
        type: String,
        validate: [isEmail, 'invalid Email'],
        required: [true, 'Email required'],
        unique: true,
    }
});

userSchema.pre('save', async function(next){
    try {
        const existingUserByUsername = await mongoose.models.User.findOne({
            username: this.username
        });
        if(existingUserByUsername){
            return next(new Error('Username already taken'));
        }

        const existingUserByEmail = await mongoose.models.User.findOne({
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

export default usersModel;


