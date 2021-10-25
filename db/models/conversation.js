const Sequelize = require('sequelize');
// const { User } = require('../index.js');


const dbConversation = (sequelize,
) => {


  return sequelize.define('Conversation', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    senderId: {
      type: Sequelize.STRING(255)
      
    }, 
    receiverId: {
      type: Sequelize.STRING(255),
    }
  });


  // return sequelize.define('Messages', {
  //   id: {
  //     type: Sequelize.INTEGER,
  //     primaryKey: true,
  //     autoIncrement: true
  //   },
  //   text: {
  //     type: Sequelize.STRING
  //   }
  // });
};

module.exports = { dbConversation };