const express = require('express');
const authController = require('../../controllers/authController');
const authenticateUser = require('../../middleware/auth.js');
const usersController = require('../../controllers/usersController');

const router = express.Router();

//http://localhost:3000/api/register 
router.post('/register', authController.register);

//http://localhost:3000/api/login
router.post('/login', authController.login);



//http://localhost:3000/api/api/tasks?page=1&limit=10
router.get('/tasks',authenticateUser, usersController.showTasks);

//http://localhost:3000/api/api/tasks
router.post('/tasks',authenticateUser, usersController.createTask); // create a new task

//http://localhost:3000/api/api/tasks/id
router.put('/tasks/:id', authenticateUser, usersController.updateTask); // update task. we can either 
                                                    // complete the whole task or change the description
//http://localhost:3000/api/api/tasks/id
router.delete('/tasks/:id',authenticateUser, usersController.deleteTask);

router.use((req, res, next) => {
    const unknownMethod = req.method;       
    const unknownPath = req.path;       

    res.status(500).json({'message': `Nepoznat zahtev ${unknownMethod} ka ${unknownPath}!`});
});

module.exports = router;

