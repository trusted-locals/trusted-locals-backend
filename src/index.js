const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { registerUser, signIn } = require('./auth/auth');
const passport = require('passport');
const { getToken } = require('./helpers/helpers');
require('../passport')(passport);

const app = express();
const port = 8080;

const frontendUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : process.env.DEV_FRONTEND_URL;

app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: frontendUrl }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/user', (req, res) => {
  registerUser(req, res);
});

app.post('/user/login', (req, res) => {
  signIn(req, res);
});

app.get(
  '/test',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    var token = getToken(req.headers);
    if (token) {
      res.send('authenticated successfully');
    } else {
      res.send('error');
    }
  }
);

app.listen(port, () => {
  console.log(`server started a http://localhost:${port}`);
});
