const express = require('express');
const feedbackController = require('../controllers/feedbackController');
const { authMiddleware } = require('../middleware/authMiddleware'); // Middleware xác thực
const router = express.Router();

// Route gửi feedback (yêu cầu đăng nhập)
router.post('/send', authMiddleware, feedbackController.sendFeedback);

// Route lấy tất cả feedbacks
router.get('/getall', feedbackController.getAllFeedbacks);

module.exports = router;
