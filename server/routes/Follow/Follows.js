const {Router} = require('express');
const follow = Router();
const { Follows, User } = require('../../../db/index.js');


follow.get('/hello', function(req, res) {
  res.sendStatus(200);
});






module.exports = follow;