const express = require('express');

const router = express.Router();

const {
    createTweet,
} = require('../controllers/tweets');

const { authMiddleware } = require('../middlewares/authMiddleware');
const { paginationMiddleware } = require('../middlewares/paginationMiddleware');

router.post('/tweets', createTweet);

module.exports = router;