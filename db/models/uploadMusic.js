const Sequelize = require('sequelize');


const dbmusicUpload = (sequelize,
) => {


  return sequelize.define('MusicUpload', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fileUrl: {
      type: Sequelize.STRING(255)
      
    }, 
  });
};

module.exports = { dbmusicUpload };