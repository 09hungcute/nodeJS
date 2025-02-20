require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Middleware cho session
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Middleware cho passport
app.use(passport.initialize());
app.use(passport.session());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Kết nối MongoDB thành công');
}).catch(err => {
  console.error('Lỗi kết nối MongoDB:', err);
});

// Cấu hình Passport Google OAuth
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,  // Lấy từ Google Cloud
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,  // Lấy từ Google Cloud
  callbackURL: '/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
  // Xử lý thông tin người dùng ở đây
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Route khởi tạo xác thực Google
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Route callback sau khi Google xác thực
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.send('Đăng nhập Google thành công!');
  }
);

// Route test
app.get('/', (req, res) => {
  res.send('Backend đang chạy!');
});

// Import routes
const userRoutes = require('./routers/userRoutes');
const productRoutes = require('./routers/productRouter');
const feedbackRoutes = require('./routers/feedbackRoutes');

// Sử dụng routes
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/feedbacks', feedbackRoutes);

// Chạy server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
