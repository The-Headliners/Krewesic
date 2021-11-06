const {Sequelize} = require('sequelize');

//the event will end up in the db when a user interacts wth it-- comments on it or likes it
const dbVideoChat = (sequelize) => {
  return sequelize.define('VideoChat', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
      
     
    },
    code: {
      type: Sequelize.STRING
    },
    creatorId: {
      type: Sequelize.INTEGER
    },
    includes: {
      type: Sequelize.STRING,
      get() {
        return this.getDataValue('includes').split(',');
      },
      set(val) {
        return this.setDataValue('includes', val.join(','));
      }
    },

  

    

  });
};

module.exports = {dbVideoChat};