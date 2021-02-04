const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String },
  created: { type: Date,  },
  updated: { type: Date,  },
  email: { type: String,  },
  status: { type: String,  },
  price: { type: Number },
  phone: { type: String },
  location: { type: String },
  userId: { type: Array, ref: 'User' },
});

module.exports = mongoose.model('Post', postSchema);
