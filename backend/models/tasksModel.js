import mongoose from "mongoose";
const tasksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    }
});

const tasksModel = mongoose.model('tasks', tasksSchema);

export default tasksModel;


