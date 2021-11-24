const express = require('express');

const router = express.Router();

const {
    createTweet,
} = require('../controllers/tweets');

const { authMiddleware } = require('../middlewares/authMiddleware');
const { paginationMiddleware } = require('../middlewares/paginationMiddleware');

router.post('/', createTweet);
router.post('/:id', findTweet);


module.exports = router;