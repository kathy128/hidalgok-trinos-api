const BaseSerializer = require('./BaseSerializer');

class TweetsSerializer extends BaseSerializer {
  constructor(models, users, comments, paginationInfo) {

    const serializedModels = models.map((model) => {
      const serializedModel = model.toJSON();
    
      for(var user in users){
     
        if(user.id==serializedModel.userId){
          serializedModel.user=user;
      
        }
      }


      delete serializedModel?.password;
      //delete serializedModel?.active;
      delete serializedModel?.role;

      return serializedModel;
    });

    super('success', serializedModels, paginationInfo);
  }
}

module.exports = TweetsSerializer;
