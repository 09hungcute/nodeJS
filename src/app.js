require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Kết nối MongoDB thành công');
}).catch(err => {
  console.error('Lỗi kết nối MongoDB:', err);
});

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
