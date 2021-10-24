const {Router} = require('express');
const post = Router();
const { Posts, User } = require('../../../db/index.js');




post.put('/profilePost', (req, res) => {
  const {id} = 1;
  Posts.findByPk(id)
    .then(post => {
      post.update({
        text: text
      })
        .then(() => {
          console.log('hello');
          res.sendStatus(201);
        });
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
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