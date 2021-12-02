const Sequelize = require('sequelize');



const dbProfilePosts = (sequelize) => {
  return sequelize.define('ProfilePosts', {

    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true

    },
    text: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    senderId: {
      type: Sequelize.INTEGER,
      // references: {
      //   model: User,
      //   key: 'id'
      // }

    },
    profileId: {
      type: Sequelize.INTEGER,
      // references: {
      //   model: User,
      //   key: 'id'
      // }
    }


  });
};

module.exports = { dbProfilePosts };