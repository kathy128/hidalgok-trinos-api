const express = require('express');

const router = express.Router();

const {
  deleteComment,
  likecomment,
} = require('../controllers/comments');

const { authMiddleware } = require('../middlewares/authMiddleware');
const { paginationMiddleware } = require('../middlewares/paginationMiddleware');

router.post('/:id/likes', authMiddleware, likecomment);
router.post('/:id', authMiddleware, deleteComment);

module.exports = router;
