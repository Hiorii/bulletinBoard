const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/user/no-permission' }),
  (req, res) => {
    res.redirect('/api/logged');
  }
);

router.get('/logout', (req, res) => {
  res.redirect('/api/loggedout');
});

module.exports = router;
