const { validationResult } = require('express-validator');
const { pool } = require('../config/database');

// @desc    Get all tasks
// @route   GET /api/v1/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    let query = 'SELECT * FROM tasks';
    let params = [];

    // If user role is 'user', only show their tasks
    if (req.user.role === 'user') {
      query += ' WHERE user_id = ?';
      params.push(req.user.id);
    }

    query += ' ORDER BY created_at DESC';

    const [tasks] = await pool.query(query, params);

    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single task
// @route   GET /api/v1/tasks/:id
// @access  Private
const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const [tasks] = await pool.query(
      'SELECT * FROM tasks WHERE id = ?',
      [id]
    );

    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const task = tasks[0];

    // Check if user owns the task (unless admin)
    if (req.user.role === 'user' && task.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this task'
      });
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create task
// @route   POST /api/v1/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { title, description, status, priority } = req.body;

    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, status, priority, user_id) VALUES (?, ?, ?, ?, ?)',
      [title, description, status || 'pending', priority || 'medium', req.user.id]
    );

    // Get created task
    const [tasks] = await pool.query(
      'SELECT * FROM tasks WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: tasks[0]
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update task
// @route   PUT /api/v1/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const { title, description, status, priority } = req.body;

    // Check if task exists
    const [tasks] = await pool.query(
      'SELECT * FROM tasks WHERE id = ?',
      [id]
    );

    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const task = tasks[0];

    // Check if user owns the task (unless admin)
    if (req.user.role === 'user' && task.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task'
      });
    }

    // Update task
    await pool.query(
      'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ? WHERE id = ?',
      [title, description, status, priority, id]
    );

    // Get updated task
    const [updatedTasks] = await pool.query(
      'SELECT * FROM tasks WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTasks[0]
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
// @access  Private (Admin only)
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if task exists
    const [tasks] = await pool.query(
      'SELECT * FROM tasks WHERE id = ?',
      [id]
    );

    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Delete task
    await pool.query('DELETE FROM tasks WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};
