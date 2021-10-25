const {Sequelize} = require('sequelize');


//the event will end up in the db when a user interacts wth it-- comments on it or likes it
const dbSGEventComment = (sequelize) => {
  return sequelize.define('SGEventComment', {

    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true

    },
    type: {
      type: Sequelize.STRING,
    },
    text: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER,

      //foreign key to user id
    },
    SGEventId: {
      type: Sequelize.STRING,

      //foreing key points to the id in sg event
    }


  });
};

module.exports = {dbSGEventComment};