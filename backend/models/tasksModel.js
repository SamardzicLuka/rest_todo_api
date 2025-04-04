const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    taskCompleted: {
        type: Boolean,
        default: false,
    },
});

const tasksModel = mongoose.model('tasks', tasksSchema);

module.exports = tasksModel;


