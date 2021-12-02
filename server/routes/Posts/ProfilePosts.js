const {Router} = require('express');
const post = Router();
const { Posts, User } = require('../../../db/index.js');




post.post('/profilePost', async(req, res) => {
  try {
    const { text } = req.body;
    const {id} = req.user;


    await Posts.create({
      text: text,
      senderId: id,
      profileId: id,
    });
    res.sendStatus(200);
  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }
});

post.get('/getProfilePost', async (req, res) => {
  try {
    //change when done testing and doing frontend
    const {id} = req.user;
    //const id = 1;
    const posties = await Posts.findAll({
      where: {profileId: id},
      include: [{model: User, attributes: ['name']}]

    });

    res.status(201).send(posties);

  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }
});

post.get('/getArtistsPosts/:id', async (req, res) => {
  try {
    //change when done testing and doing frontend
    //const { profileId, senderId, id } = req.params;
    //const {id} = req.user;

    const {id} = req.params;

 
    const posties = await Posts.findAll({
      where: {profileId: id},
      include: [{model: User, attributes: ['name']}]

    });

    res.status(201).send(posties);

  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }
});



module.exports = post;