const Sequelize = require('sequelize');



const dbMessages = (sequelize,
) => {


  return sequelize.define('Messages', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: Sequelize.STRING
    },
    // conversationId: {
    //   type: Sequelize.INTEGER,
    // },
    sender: {
      type: Sequelize.INTEGER //forein key: id of user sending
    },
    receiver: {
      type: Sequelize.INTEGER //foreign key: id of user receiving 
    },
    // name: {
    //   type: Sequelize.STRING
    // }
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