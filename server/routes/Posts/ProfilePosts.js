const {Router} = require('express');
const post = Router();
const { Posts, User } = require('../../../db/index.js');




post.post('/profilePost/:profileId', async(req, res) => {
  try {
    const { text } = req.body;
    const { profileId, senderId } = req.params;
    //const {id} = req.user;
    // console.log(req.body, 'howdy ho');
    // console.log(Posts, 'userino');
    // console.log(req.params, 'hello');
    const id = 1;
    //const senderId = 1 || 2;

    await Posts.create({
      text: text,
      senderId: id,
      profileId: id,
    });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});



// Messages.post('/sendMessage/:recipientId', async (req, res) => {
//   try {
//     const {subject, message} = req.body;
//     const {recipientId} = req.params;
//     const {id} = req.user;
//     await Message.create({
//       subject: subject,
//       text: message,
//       userFromId: id,
//       userToId: recipientId
//     });
//     res.sendStatus(200);
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// });


module.exports = post;