const {Router} = require('express');
const auth = Router();
const passport = require('passport');
const {User} = require('../../db/index.js');


auth.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}) );



//callback redirect for google
auth.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.cookie('user', req.user.name);
  //if the type is null: this redirects to the form
  if (req.user.type !== null) { // //if the type is not null: redirect to the artistOfDay page
    res.redirect('/DiscoverArtists');
  } else {
    res.redirect('/form');
  }




});

//auth logout
auth.get('/logout', (req, res) => {
  console.log('logout');
  res.clearCookie('user');
  req.logout();
  res.redirect('/');
});

//get request to get the cookie and user's name
auth.get('/cookie', async (req, res) => {
  const arr = req.headers.cookie.split('; ');

  let user = null;
  for (let i = 0; i < arr.length; i++) {
    const cookie = arr[i].split('=');
    if (cookie[0] === 'user') {
      user = cookie[1];
      user = user.replace('%20', ' ');
    }
  }

  try {
    const userInfo = await User.findAll({
      where: {
        name: user,
      },
      include: [{model: Messages}]
    });
    res.json(userInfo);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});


module.exports = auth;
