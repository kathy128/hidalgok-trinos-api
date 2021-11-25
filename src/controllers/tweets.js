const ApiError = require('../utils/ApiError');
const TweetSerializer = require('../serializers/TweetSerializer');
const TweetsSerializer = require('../serializers/TweetsSerializer');
const {findUser} = require('../controllers/users');
const { Tweets, Comments , User } = require('../database/models');
const { OPEN_READWRITE } = require('sqlite3');


const getAllTweets = async (req, res, next) => {
  try {
    const tweet = await Tweets.findAll({ ...req.pagination });
    const users = await User.findAll({...req.pagination})
    res.json(new TweetsSerializer(tweet ,users, await req.getPaginationInfo(Tweets)));
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
    res.json({
      "status": "success",
      "data": null
    });
  } catch (err) {
    next(err);
  }
};
const likeTweet = async (req, res, next) => {
  try {
    const { params } = req;
    const tweetId = Number(params.id) ;
    const tweet = await findTweet({ id: tweetId });
    var count = tweet.likeCounter;
    count = count+1;
    Object.assign(tweet, { likeCounter: count });
    await tweet.save();

    res.json(tweet.dataValues);
  } catch (err) {
    next(err);
  }
};
const findTweet = async (where) => {
 // Object.assign(where, { active: true });

  const tweet = await Tweets.findOne({ where });
  if (!tweet) {
    throw new ApiError('tweet no encontrado', 404);
  }

  return tweet;
}; 


const createTweet = async (req, res, next) => {
    try {
      const { body } = req;
      const user = await findUser({ id: Number(req.user.id) })
      const TweetPayload = {
        text: body.text,
        user: req.user.id,
      };
      if (Object.values(TweetPayload).some((val) => val === undefined)) {
        throw new ApiError('Bad Request', 400);
      }
    
      const tweet = await Tweets.create(TweetPayload);
  
      res.json(new TweetSerializer(tweet,null,user.toJSON()));
    } catch (err) {
      next(err);
    }
  };
  const getTweetById = async (req, res, next) => {
    try {
      const { params } = req;
      const tweet = await findTweet({ id: params.id });

      const userId = await findUser({id: Number(params.id)})
      res.json(tweet.dataValues);
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
      tweet: req.dataValues,
  }
      if (Object.values(commentPayload).some((val) => val === undefined)) {
        throw new ApiError('Payload must contain text', 400);
      }
    
      const tweetp = await Comments.create(commentPayload);
      user  = await Tweet.findUser({id: user.id});
      res.json(new UserSerializer(tweetp));
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
    getTweetById,
    likeTweet,
  };