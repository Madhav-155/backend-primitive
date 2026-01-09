const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  register,
  login,
  getMe
} = require('../controllers/authController');
const {
  registerValidation,
  loginValidation
} = require('../middleware/validation');

// Public routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

// Protected routes
router.get('/me', protect, getMe);

module.exports = router;
