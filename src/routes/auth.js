const express = require('express');
const { login, register, forgotPassword, resetPassword, revokeRefreshToken, verifyEmail, genAccessTokenFromRefresh, createUser } = require('../controllers/auth.controller');
const { validateApiKey } = require('../middlewares/auth.middleware')
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');

router.post('/login',  login);
router.post('/register', register);
router.get('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password', resetPassword);
router.post('/refresh-token', genAccessTokenFromRefresh);
router.post('/revoke-refresh-token', revokeRefreshToken);
router.post('/create-user', isAuthenticated, isAdmin, createUser);

module.exports = router;