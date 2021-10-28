const {Router} = require('express');
const follow = Router();
const { Follows, User } = require('../../../db/index.js');




follow.get('/followedArtist/:id', (req, res) => {
  //const id = 2;
  const {id} = req.params;
  User.findByPk(id)
    .then(user => res.status(201).send(user))
    .catch(err => {
      console.warn(err);
      res.sendStatus(500);
    });
});

// follow.get('/followedArtist/:name', (req, res) => {
//   const artistName = 'CLEAF';
//   //const {id} = req.params;
//   User.findByPk(name)
//     .then(user => res.status(201).send(user))
//     .catch(err => {
//       console.warn(err);
//       res.sendStatus(500);
//     });
// });

follow.get('/getFollows', async (req, res) => {
  try {
    //change when done testing and doing frontend
    const {id} = req.user;
    //const id = 1;
    const follows = await Follows.findAll({
      where: {followId: id},
      include: [{model: User, attributes: ['name']}]

    });

    res.status(201).send(follows);

  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }
});

follow.post('/myFavArtists', async(req, res) => {
  try {
    const { artist } = req.body;
    //const { followId, followedId } = req.params;
    const {id} = req.user;
    // const id = 1;
    // const artistId = 2;
    const { artistId } = req.params;
    await Follows.create({
      artist: artist,
      followId: id,
      followedId: artistId,
    });
    res.sendStatus(200);
  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }
});

module.exports = follow;