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

    },
    profileId: {
      type: Sequelize.INTEGER,

    }


  });
};

module.exports = { dbProfilePosts };