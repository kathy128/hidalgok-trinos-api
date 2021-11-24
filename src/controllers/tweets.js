const ApiError = require('../utils/ApiError');
const { Tweets } = require('../database/models');
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
  module.exports = {
    createTweet,
  };