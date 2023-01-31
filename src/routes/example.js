const express = require('express');
const { updown } = require('../controllers/example.controller');
const { userHasValidSession } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/updown/:userid', userHasValidSession,  updown)


module.exports = router;