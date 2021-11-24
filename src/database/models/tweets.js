const {
    Model,
  } = require('sequelize');
  
  const bcrypt = require('bcrypt');
  
  const { SALT_ROUNDS } = require('../../config');
  
  const { ROLES } = require('../../config/constants');
  
  module.exports = (sequelize, DataTypes) => {
    class Tweets extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
      }
    }
    Tweets.init({
      Text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      likeCounter: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    
    }, {
      sequelize,
      modelName: 'Tweets',
    });
  
    return Tweets;
  };
  