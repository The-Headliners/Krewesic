const {Router} = require('express');
const userRouter = Router();
require('dotenv').config();
const axios = require('axios');
const { User, VideoChat} = require('../../db/index.js');

userRouter.get('/user/:userId', async (req, res) => {
  try {
    const {userId} = req.params;

    const userProf = await User.findByPk(userId);
    res.status(201).send(userProf);


    // const {id, name, picture, type, bio, favGenre, favArtist, artistBio, artistName, myGenre, city, pic, setPic, influences, setInfluence, posts, setMyPosts } = req.user;
    // res.status(201).send({id, name, picture, type, bio, favGenre, favArtist, artistBio, artistName, myGenre, city, pic, setPic, influences, setInfluence, posts, setMyPosts });

  } catch (err) {
    console.warn(err);
  }
});


userRouter.get('/allUsers', async(req, res) => {
  
  const allUsers = await User.findAll();
  // console.log('all users', allUsers);
  res.status(201).send(allUsers);

});

userRouter.post('/newVideoChat', async(req, res) => {
  try {
    const {code, includes, creatorId} = req.body;

    await VideoChat.create({
      code: code,
      includes: includes,
      creatorId: creatorId
    });
    res.sendStatus(200);
  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }
});

userRouter.get('/videoChats', async(req, res) => {
  try {
    const vidChats = await VideoChat.findAll({
      include: [{model: User, attributes: ['name', 'id']}]
    });
    res.status(201).send(vidChats);
  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }
} );

module.exports = userRouter;