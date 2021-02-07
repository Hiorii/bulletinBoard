const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');

router.get('/posts', PostController.getAll);
router.get('/posts/:id', PostController.getById);
router.post('/posts', PostController.addNew);
router.put('/posts/:id', PostController.update);

module.exports = router;
