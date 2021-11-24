const express = require('express');

const router = express.Router();

const {
    createTweet,
    findTweet,
    deleteTweet,
    createComment,
    getAllTweets,
    getTweetByUser,
} = require('../controllers/tweets');

const { authMiddleware } = require('../middlewares/authMiddleware');
const { paginationMiddleware } = require('../middlewares/paginationMiddleware');

router.post('/', createTweet);
router.get('/:id', findTweet);
router.delete('/:id',deleteTweet);
router.post('/:id',createComment);
router.get('/',paginationMiddleware, getAllTweets);
route.get('/feed/:username',getTweetByUser);
    


module.exports = router;