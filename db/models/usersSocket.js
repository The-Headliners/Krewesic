const Sequelize = require('sequelize');


const dbSocket = (sequelize,
) => {


  return sequelize.define('UsersSocket', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    }, 
    socketId: {
      type: Sequelize.STRING(255),
    }
  });

};

module.exports = { dbSocket };