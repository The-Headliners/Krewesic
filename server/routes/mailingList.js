
const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();

const mailingList = Router();

const postUrl = `https://gmail.us5.list-manage.com/subscribe/post?u=${process.env.REACT_APP_MAILCHIMP_U}&id=${process.env.REACT_APP_MAILCHIMP_ID}`;

mailingList.get('/mailingList', async(req, res) => {
  try {
    const { data } = await axios.get(postUrl);
    console.log(data);
    res.status(201).send(data);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
module.exports = mailingList;