const {Router} = require('express');
const post = Router();
const { Posts, User } = require('../../../db/index.js');




post.put('/profilePost', (req, res) => {

  console.log(req.body, 'howdy ho');
  console.log(Posts, 'userino');
  console.log(req.params, 'hello');
  res.sendStatus(500);
  //const {id} = req.user;
  const id = 1;

});



// form.put('/createListener', (req, res) => {
//   const {id} = req.user;
//   User.findByPk(id)
//     .then(user => {
//       user.update({
//         bio: bio,
//         favGenre: favGenre,
//         favArtist: favArtist,
//         city: city,
//         pic: pic
//       })
//         .then(() => {
//           console.log('hello');
//           res.sendStatus(201);
//         });
//     })
//     .catch(err => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// });


module.exports = post;