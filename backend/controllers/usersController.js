const User = require('../models/usersModel');
const Task = require('../models/tasksModel');

module.exports.showTasks = async (req,res,next) => {
    try {
        const user = await User.
            findById(req.user.userID).
            populate('taskList').
            exec();

        if (!user) {
            return res.status(404).json({message: 'User not found'}); 
        }

        if(!user.taskList.length){
            return res.status(200).json({
                message: "No tasks scheduled",
                tasks: [],
            }); 
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;

        const totalTasks = user.taskList.length;
        const tasksToShow = user.taskList.slice(startIndex, startIndex + limit);

        const totalPages = Math.ceil(totalTasks / limit);

        res.status(200).json({
          currentPage: page,
          totalPages: totalPages,
          totalTasks: totalTasks,
          tasks: tasksToShow,
        });

              
    } catch (error) {
        next(error);
    }
}

module.exports.createTask = async (req, res, next) => {
    if(!req.body.title){
        return res.status(400).json({error: "Title required that has not been provided"});
    }
    try{
        const user = await User.findById(req.user.userID).exec();
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const newTask = new Task({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            description: req.body.description,
            user: req.user.userID,
            taskCompleted: false,
        });
        await newTask.save();
        
        user.taskList.push(newTask._id);
        await user.save();
       
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
}

module.exports.updateTask = async (req,res,next) => {
   try {
        const task = await Task.findById(req.params.id);
        if(!task){
            return res.status(404).json({error: "Task not found"});
        }
        if(req.body.description){
            task.description = req.body.description;
        }
        if(req.body.taskCompleted){
            task.taskCompleted = req.body.taskCompleted;
        }

        await task.save();

        res.status(200).json({message: "Task updated successfully", task});

   } catch (error) {
        next(error);
   } 
}
