const Sequelize = require('sequelize');
const { User } = require('../index.js');


const dbMessages = (sequelize,
) => {


  return sequelize.define('Messages', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: Sequelize.STRING
    },
    conversationId: {
      type: Sequelize.INTEGER,
    },
    sender: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
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

module.exports = { dbMessages };