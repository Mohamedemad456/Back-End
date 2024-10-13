const express = require('express');
const router = express.Router();


const {getTasks, getTaskById, getTasksByCategoryId , createTask, updateTask, deleteTask, filterTasks} = require('../controllers/taskControllers');

router.get('/filter',filterTasks);
router.get('/category/:categoryId',getTasksByCategoryId);
router.get('/:id',getTaskById);
router.get('/',getTasks);
router.post('/',createTask);
router.put('/:id',updateTask);
router.delete('/:taskId/:workSpaceId',deleteTask);

module.exports = router;