const Feedback = require('../models/feedback');

// Gửi feedback (yêu cầu đăng nhập)
exports.sendFeedback = async (req, res) => {
    const { comment, rate } = req.body;
    const userId = req.user.id; // Lấy ID người dùng từ token

    if (!comment || rate === undefined || rate < 1 || rate > 5) {
        return res.status(400).json({ message: 'Vui lòng nhập comment và rate hợp lệ (từ 1 đến 5)' });
    }

    try {
        const feedback = new Feedback({
            userId,  // Lưu ID người gửi feedback
            comment,git remote add origin https://github.com/09hungcute/nodeJS.git
            rate
        });

        await feedback.save();

        res.status(201).json({ message: 'Gửi feedback thành công', feedback });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi gửi feedback', error });
    }
};

// Lấy tất cả feedbacks (hiển thị thêm thông tin người gửi)
exports.getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate('userId', 'username email'); // Lấy thêm thông tin user
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy feedbacks', error });
    }
};
