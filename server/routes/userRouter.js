const {Router} = require('express');
const userRouter = Router();
require('dotenv').config();
const axios = require('axios');
const {SGEvent, SGEventComment, User, Event} = require('../../db/index.js');

userRouter.get('/user/:userId', async (req, res) => {
  try {
    console.log('user router');
    const {userId} = req.params;

    const userProf = await User.findByPk(userId);
    res.status(201).send(userProf);


    // const {id, name, picture, type, bio, favGenre, favArtist, artistBio, artistName, myGenre, city, pic, setPic, influences, setInfluence, posts, setMyPosts } = req.user;
    // res.status(201).send({id, name, picture, type, bio, favGenre, favArtist, artistBio, artistName, myGenre, city, pic, setPic, influences, setInfluence, posts, setMyPosts });

  } catch (err) {
    console.log('get err', err);
  }
});

module.exports = userRouter;