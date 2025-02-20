const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;

    // Xác minh token Google
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, sub } = ticket.getPayload();

    // Kiểm tra user đã tồn tại chưa
    let user = await User.findOne({ gmail: email });

    if (!user) {
      // Nếu chưa có user, tạo user mới
      user = new User({
        username: name,
        gmail: email,
        password: sub,  // Google không cung cấp password, có thể dùng sub làm ID duy nhất
        address: '',
        fullname: name,
      });
      await user.save();
    }

    // Tạo token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, username: user.username, gmail: user.gmail } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi đăng nhập Google' });
  }
};
