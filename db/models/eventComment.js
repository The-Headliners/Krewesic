const {Sequelize} = require('sequelize');

const dbEventComment = (sequelize) => {
  return sequelize.define('EventComment', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      //foreign key pointing to user
    },
    eventId: {
      type: Sequelize.INTEGER, 
      //foreign key
    },
    text: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    }

  });
};

module.exports = {dbEventComment};