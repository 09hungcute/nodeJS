const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Đăng ký user
exports.register = async (req, res) => {
  try {
    const { username, gmail, password, address, fullname } = req.body;

    // Kiểm tra user đã tồn tại chưa
    let user = await User.findOne({ gmail });
    if (user) return res.status(400).json({ message: 'Email đã tồn tại' });

    // Mã hóa password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Tạo user mới
    user = new User({ 
      username, 
      gmail, 
      password: hashedPassword, 
      address, 
      fullname 
    });    
    await user.save();

    res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Đăng nhập user
exports.login = async (req, res) => {
  try {
    const { gmail, password } = req.body;

    // Kiểm tra user tồn tại không
    const user = await User.findOne({ gmail });
    if (!user) return res.status(400).json({ message: 'Email không tồn tại' });

    // Kiểm tra password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Sai mật khẩu' });

    // Tạo token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, username: user.username, gmail: user.gmail } });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Lấy thông tin user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User không tồn tại' });
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};