const BaseSerializer = require('./BaseSerializer');

class TweetSerializer extends BaseSerializer {
  constructor(model, comment, user) {
    const serializedModel = model ? model.toJSON() : null;

    delete serializedModel?.password;
    delete serializedModel?.active;

    super('success', serializedModel);
  }
}

module.exports = TweetSerializer;