const express = require('express');
const { createCheckoutSession, getCheckoutSesssion, updateStatusOnSuccess, getAllPayments } = require('../controllers/payment.controller');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');

router.post('/', isAuthenticated, createCheckoutSession);
router.get('/',  isAuthenticated, isAdmin, getAllPayments);
router.get('/:id', getCheckoutSesssion);
router.post('/update', updateStatusOnSuccess);

module.exports = router;