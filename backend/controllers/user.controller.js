const User = require('../models/user.model');
const ApiURL = require('../settings/config');
const jwt = require("jsonwebtoken");

exports.getAll = async(req,res)=> {
  try {
    const result = await User.find();
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.logIn = async(req,res)=> {
  try {
    const result = await req.user;
    if(!result) res.status(404).json({ post: 'Not found' });
    else {
      let username = req.user.emails[0].value;
      const token = jwt.sign({user:username},'secret_key')
      User.countDocuments({email: username}, async (err,count)=> {
        if(count>0) {
          const currUser = await(User.findOne({email: username}));
          if(!currUser) res.status(404).json({message:'Not found...'});
          else {
            currUser.isLogged = true;
            await currUser.save();
            res.cookie('username', token, { maxAge: 7200000, httpOnly: false });
            return res.redirect(ApiURL);
          }
        } else {
          let newUser = new User({
            name: req.user.name.givenName + ' ' + req.user.name.familyName,
            email: username,
            role: 'user',
            isLogged: true,
          })
          await newUser.save();
          res.cookie('username', token, { maxAge: 7200000, httpOnly: false });
          res.redirect(ApiURL);
        }
      })
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.logOut = async(req,res)=> {
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
        return res.redirect(ApiURL);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  };
};

exports.update = async(req,res) => {
  const {phone, location} = req.body;
  try {
    const user = await(User.findById(req.params.id));
    if(!user) res.status(404).json({message: 'Not found...'})
    else {
      user.phone = phone;
      user.location = location;
      await user.save();
      res.json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  };
};
