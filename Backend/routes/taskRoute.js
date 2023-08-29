const express = require('express')
const router = express.Router();
const {getAllTask,createTask,getTaskDetails,updateTask,deleteTask} =  require('../controllers/taskController');

router.route('/allTask').get(getAllTask)
router.route('/createTask').post(createTask)
router.route('/task/:id').get(getTaskDetails)
.delete(deleteTask)
.put(updateTask);

module.exports = router;