const express = require('express');
const router = express.Router();


const {getTasks, getTaskById, getTasksByCategoryId , createTask, updateTask, deleteTask} = require('../controllers/taskControllers');

router.get('/',getTasks);
router.get('/:id',getTaskById);
router.get('/category/:categoryId',getTasksByCategoryId);
router.post('/',createTask);
router.put('/:id',updateTask);
router.delete('/:taskId/:workSpaceId',deleteTask);

module.exports = router;