const express = require('express');
const router = express.Router();

const {getWorkSpace, getWorkSpaceById, createWorkspace, deleteWorkSpace} = require('../controllers/WorkSpaceControllers');


// Routes
router.get('/',getWorkSpace);
router.get('/:id',getWorkSpaceById);
router.post('/',createWorkspace);
router.delete('/:id',deleteWorkSpace);

module.exports = router;