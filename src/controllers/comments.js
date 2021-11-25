const ApiError = require('../utils/ApiError');
const { Comments } = require('../database/models').default;

const findCommend = async (where) => {
  Object.assign(where, !{ data: null });

  const Comment = await Comments.findOne({ where });
  if (!Comment) {
    throw new ApiError('comentario no encontrado', 404);
  }

  return Comment;
};

const deleteComment = async (req, res, next) => {
  try {
    const { params } = req;

    const status = Number(params.id);

    const comments = await findCommend({ id: status.id });

    Object.assign(comments, { active: false });

    await comments.save();

    res.json(null);
  } catch (err) {
    next(err);
  }
};
const likecomment = async (req, res, next) => {
  try {
    const { params } = req;
    const commentId = Number(params.id);
    const comment = await findCommend({ id: commentId });
    let count = comment.likeCounter;
    count += 1;
    Object.assign(comment, { likeCounter: count });
    await comment.save();

    res.json(comment.dataValues);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  deleteComment,
  likecomment,
};
