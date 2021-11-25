const BaseSerializer = require('./BaseSerializer');

class TweetSerializer extends BaseSerializer {
  constructor(model, comments, users) {
    const serializedModel = model ? model.toJSON() : null;
    delete serializedModel?.active;
    
    //const userbn = users.find((user)=>{user.id==serializedModel.user});
    if(model){
        serializedModel.comments=comments;
        serializedModel.user=users;
    }
   delete serializedModel.user.password;
    super('success', serializedModel);
  }
}

module.exports = TweetSerializer;