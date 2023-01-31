const express = require('express');
const { getAllProducts, getProductById, updateProduct, deleteProductById, createProduct } = require('../controllers/product.controller');
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/',  getAllProducts)
router.get('/:id', getProductById);
router.patch('/:id',  isAuthenticated, isAdmin, updateProduct);
router.delete('/:id',  isAuthenticated, isAdmin, deleteProductById);
router.post('/', isAuthenticated, isAdmin, createProduct);

module.exports = router;