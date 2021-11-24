const ApiError = require('../utils/ApiError');
const { Tweets, Comments } = require('../database/models');

const getAllTweets = async (req, res, next) => {
  try {
    const tweet = await Tweets.findAll({ ...req.pagination });

    res.json(new UsersSerializer(tweet, await req.getPaginationInfo(Tweets)));
  } catch (err) {
    next(err);
  }
};

const deleteTweet = async (req, res, next) => {
  try {
    const { params } = req;

    const tweetId = Number(params.id) ;

    const tweet = await findTweet({ id: tweetId });

    Object.assign(tweet, { active: false });

    await tweet.save();

    res.json(null);
  } catch (err) {
    next(err);
  }
};
const findTweet = async (where) => {
  Object.assign(where, { active: true });

  const tweet = await Tweets.findOne({ where });
  if (!tweet) {
    throw new ApiError('tweet no encontrado', 404);
  }

  return tweet;
};  
const createTweet = async (req, res, next) => {
    try {
      const { body } = req;

      const TweetPayload = {
        Text: body.Text,
      };
  
      if (Object.values(TweetPayload).some((val) => val === undefined)) {
        throw new ApiError('Bad Request', 400);
      }
    
      const tweet = await Tweets.create(TweetPayload);
  
      res.json(new UserSerializer(tweet));
    } catch (err) {
      next(err);
    }
  };
  const getTweetByUser = async (req, res, next) => {
    try {
      const { params } = req;
      const { body } = req;
      const tweet = await findTweet({ Tweet: Number(params.id)});
      const userId = await findUser({id: Number(params.id)})
      console.log(userId);
      res.json(new UserSerializer(tweet));
    } catch (err) {
      next(err);
    }
  };
  const createComment = async (req, res, next) => {
    try {
      const { body } = req;
      const { params } = req;

    const tweetId = Number(params.id);

    const tweet = await findTweet({ id: tweetId });
    if (tweet) {
      throw new ApiError('tweet no encontrado', 404);
    }
    const commentPayload = {
      Text: body.Text,
  }
      if (Object.values(commentPayload).some((val) => val === undefined)) {
        throw new ApiError('Payload must contain text', 400);
      }
    
      const tweet = await Comments.create(commentPayload);
      user  = await Tweet.findUser({id: user.id});
      res.json(new UserSerializer(tweet));
    } catch (err) {
      next(err);
    }
  };
  module.exports = {
    createTweet,
    findTweet,
    deleteTweet,
    createComment,
    getAllTweets,
    getTweetByUser,
  };