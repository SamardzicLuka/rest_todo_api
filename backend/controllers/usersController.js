const User = require('../models/usersModel');

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

