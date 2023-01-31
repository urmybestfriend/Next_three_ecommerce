const express = require('express');
const { getAllUsers, getUserById, getProfile, updateUser, updateProfile, changePassword, deleteUserById, approveUserById, changeUserRole } = require('../controllers/users.controller');
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/', isAuthenticated, isAdmin,  getAllUsers)
router.get('/:id', isAuthenticated, isAdmin, getUserById);
router.get('/profile/details', isAuthenticated, getProfile);
router.patch('/:id', isAuthenticated, isAdmin,  updateUser);
router.patch('/profile/update', isAuthenticated, updateProfile);
router.patch('/profile/change-password', isAuthenticated, changePassword);
router.delete('/:id', isAuthenticated, isAdmin, deleteUserById);
router.patch('/approve/:id', isAuthenticated, isAdmin, approveUserById);
router.patch('/change-role/:id',  isAuthenticated, isAdmin, changeUserRole);

module.exports = router;