const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 5, maxlength: 45 },
  text: { type: String, required: true, minlength: 10, maxlength: 250 },
  image: { type: String },
  created: { type: String },
  updated: { type: String, required: true },
  email: { type: String,  },
  status: { type: String, required: true },
  price: { type: Number, required: true },
  phone: { type: String },
  location: { type: String },
  userId: { type: String, ref: 'User', required: true },
});

module.exports = mongoose.model('Post', postSchema);
