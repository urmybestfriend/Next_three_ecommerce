const express = require('express');
const { getAllOrder, getOrderById, updateOrder, deleteOrderById, createOrder, getOrderByUserId } = require('../controllers/order.controller');
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/', isAuthenticated, isAdmin, getAllOrder)
router.get('/:id', isAuthenticated, getOrderById);
router.get('/user/:id', isAuthenticated, getOrderByUserId);
router.patch('/:id',  isAuthenticated, updateOrder);
router.delete('/:id',  isAuthenticated, deleteOrderById);
router.post('/', isAuthenticated, createOrder);

module.exports = router;