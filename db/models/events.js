const {Sequelize} = require('sequelize');

const dbEvent = (sequelize) => {
  return sequelize.define('Event', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    artistId: {
      type: Sequelize.INTEGER //this a foregin key to point to user who create the event
    },
    type: {
      type: Sequelize.STRING,
    }, 
    performers: {
      type: Sequelize.STRING, //list the performers involved in the event, stringed
    },
    when: {
      type: Sequelize.DATE
    },
    medium: {
      type: Sequelize.STRING,
    },
    lat: {
      type: Sequelize.FLOAT
    },
    lng: {
      type: Sequelize.FLOAT
    },
    address: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    venue: {
      type: Sequelize.STRING
    },
    code: {
      type: Sequelize.STRING
    }

  
    
  });
};

module.exports = dbEvent;