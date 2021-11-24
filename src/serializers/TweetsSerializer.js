const BaseSerializer = require('./BaseSerializer');

class TweetsSerializer extends BaseSerializer {
  constructor(models, users, comments, paginationInfo) {
    const serializedModels = models.map((model) => {
      const serializedModel = model.toJSON();
      let auxUser;
      for(user of users){
        if(user.id==serializedModel.userId){
          auxUser=user;
        }
      }
      serializedModel.user=auxUser;

      delete serializedModel?.password;
      delete serializedModel?.active;
      delete serializedModel?.role;

      return serializedModel;
    });

    super('success', serializedModels, paginationInfo);
  }
}

module.exports = TweetsSerializer;
