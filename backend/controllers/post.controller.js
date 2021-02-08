const Post = require('../models/post.model');

exports.getAll = async(req, res) => {
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
};

exports.getById = async(req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
};

exports.addNew = async(req,res)=> {
  const {title, price, text, created, updated, status, image, userId} = req.body;
  try {
    if (title && price && text) {
      if(title.length > 5 && title.length < 45 && price > 0 && text.length > 10 && text.length < 250) {
        let newPost = new Post({
          title: title,
          price: price,
          text: text,
          created: created,
          updated: updated,
          status: status,
          image: image,
          userId: userId,
        })
        await newPost.save();
        res.json(newPost);
      } else {
        throw new Error('Wrong data!');
      }
    } else {
      throw new Error('Wrong input!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.update = async(req,res)=> {
  const {title, price, text, created, updated, status, image, userId} = req.body;
  try {
    let post = await (Post.findById(req.params.id));
    if(!post) res.status(404).json({message: 'Not found...'});
    else {
      post.title = title;
      post.price = price;
      post.text = text;
      post.created = created;
      post.updated = updated;
      post.status = status;
      post.image = image;
      post.userId = userId;
      await post.save();
      res.json(post);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


