const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.header('Authorization'); // Lấy token từ header
    if (!token) return res.status(401).json({ message: 'Không có token, quyền truy cập bị từ chối' });

    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Giải mã token
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token không hợp lệ' });
  }
};