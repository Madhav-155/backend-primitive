const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const {
  createTaskValidation,
  updateTaskValidation
} = require('../middleware/validation');

// All routes are protected
router.use(protect);

// Routes
router.route('/')
  .get(getTasks)
  .post(createTaskValidation, createTask);

router.route('/:id')
  .get(getTask)
  .put(updateTaskValidation, updateTask)
  .delete(authorize('admin'), deleteTask);

module.exports = router;
