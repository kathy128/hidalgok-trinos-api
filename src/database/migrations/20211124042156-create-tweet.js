module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tweets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      likeCounter: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      user: {
        allowNull: false,
        type: Sequelize.INTEGER,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tweets');
  },
};
