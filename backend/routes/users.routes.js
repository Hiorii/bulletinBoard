const express = require('express');
const router = express.Router();

const User = require('../models/user.model');

router.get('/loggedout',async (req,res)=> {
  try {
    const result = await req.user;
    if(!result) res.status(404).json({ post: 'Not foundx' });
    else {
      let newUser = await(User.findOne({email: req.user.emails[0].value}));
      if(!newUser) res.status(404).json({message:'Not found...'});
      else {
        newUser.isLogged = false;
        await newUser.save();
        req.logout();
        res.clearCookie('username');
        return res.redirect('http://localhost:3000/');
       }
    }
  } catch (err) {res.status(500).json(err);}
})

router.get('/logged', async (req,res)=> {
  try {
    const result = await req.user;
    if(!result) res.status(404).json({ post: 'Not found' });
    else {
      User.countDocuments({email: req.user.emails[0].value}, async (err,count)=> {
        if(count>0) {
          const currUser = await(User.findOne({email: req.user.emails[0].value}));
          if(!currUser) res.status(404).json({message:'Not found...'});
          else {
            currUser.isLogged = true;
            await currUser.save();
            res.cookie('username', req.user.emails[0].value, { maxAge: 7200000, httpOnly: false });
            return res.redirect('http://localhost:3000/');
          }
        } else {
          let newUser = new User({
            name: req.user.name.givenName + ' ' + req.user.name.familyName,
            email: req.user.emails[0].value,
            role: 'user',
            isLogged: true,
          })
          await newUser.save();
          res.redirect('http://localhost:3000/');
        }
      })
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/users', async (req,res)=> {
  try {
    const result = await User.find();
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
