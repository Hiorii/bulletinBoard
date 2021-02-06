const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');
//const User = require('../models/user.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .populate('userId')
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts', async (req,res)=> {
  const {title, price, text, created, updated, status, userId} = req.body;
  try {
    let newPost = new Post({
      title: title,
      price: price,
      text: text,
      created: created,
      updated: updated,
      status: status,
      userId: userId,
    })
    //await newPost.save().populate('userId');
    await newPost.save().populate('userId').execPopulate();
    //await newPost.save().then(newPost => newPost.populate('userId').execPopulate());
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
