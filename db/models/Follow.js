const Sequelize = require('sequelize');
const { User } = require('../index.js');


const dbFollow = (sequelize) => {
  return sequelize.define('Follow', {

    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    artist: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    followId: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id'
      }

    },
    followedId: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    }


  });
};

module.exports = { dbFollow };