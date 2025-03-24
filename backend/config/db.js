import mongoose from 'mongoose';

const databaseString = 'mongodb://localhost:27017/todo';
function connectDB(){

    mongoose.connect(databaseString);

    mongoose.connection.once('open', function () {
        console.log('Successful connecting!');
    });
    mongoose.connection.on('error', error => {
        console.log('Error', error);
    });
}
export default connectDB;
