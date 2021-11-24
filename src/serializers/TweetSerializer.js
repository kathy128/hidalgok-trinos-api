const BaseSerializer = require('./BaseSerializer');

class TweetSerializer extends BaseSerializer {
  constructor(model, comments, user) {
    const serializedModel = model ? model.toJSON() : null;
    delete serializedModel?.active;
    if(model){
        serializedModel.comments=comments;
        serializedModel.user=user;
    }
    super('success', serializedModel);
  }
}

module.exports = TweetSerializer;