const mongoose = require('mongoose');

const databaseString = 'mongodb://localhost:27017/todo';
async function connectDB(){
    try {
    await mongoose.connect(databaseString);
        console.log('Successful connection!');
    }catch(error){
        console.log("An error during the database connection occured", error);
    }

}
module.exports = connectDB;

