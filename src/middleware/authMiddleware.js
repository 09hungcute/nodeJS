const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    const token = req.header('Authorization'); // Lấy token từ header

    if (!token) {
        return res.status(401).json({ message: 'Bạn chưa đăng nhập' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Giải mã token
        req.user = decoded; // Lưu thông tin người dùng vào `req`
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token không hợp lệ' });
    }
};
