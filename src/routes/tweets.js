const express = require('express');

const router = express.Router();

const {
    createTweet,
    //findTweet,
    deleteTweet,
    createComment,
    getAllTweets,
    getTweetById,
    likeTweet,
} = require('../controllers/tweets');

const { authMiddleware } = require('../middlewares/authMiddleware');
const { paginationMiddleware } = require('../middlewares/paginationMiddleware');
router.post('/:id/likes', authMiddleware, likeTweet);
router.post('/',authMiddleware, createTweet);
//router.get('/:id', findTweet);
router.delete('/:id',authMiddleware, deleteTweet);
router.post('/:id',createComment);
router.get('/',paginationMiddleware, authMiddleware, getAllTweets);
router.get('/:id',getTweetById);
    


module.exports = router;