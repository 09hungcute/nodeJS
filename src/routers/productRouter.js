const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route lấy tất cả sản phẩm
router.get('/getall', productController.getAllProducts);

// Route lấy sản phẩm theo ID
router.get('/:id', productController.getProductById);

// Route thêm sản phẩm mới
router.post('/add', productController.createProduct);

module.exports = router;
