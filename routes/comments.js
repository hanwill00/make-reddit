const express = require('express');
const router = express.Router({mergeParams: true});
const auth = require('./helpers/auth');
const Room = require('../models/room');
const Post = require('../models/post');
const Comment = require('../models/comment');

router.get('/new', auth.requireLogin, (req, res, next) => {
  Room.findById(req.params.roomId, function(err, room) {
    if (err) {console.error(err)};
    
    Post.findById(req.params.postId, function(err, post) {
      if (err) { console.error(err) }

      res.render('comments/new', { post: post, room: room });
    });
  });
});

router.post('/', auth.requireLogin, (req, res, next) => {
  Room.findById(req.params.roomId, function(err, room) {
    if (err) {console.error(err)};

    Post.findById(req.params.postId, function(err, post) {
      if (err) {console.error(err)};

      let comment = new Comment(req.body);
      post.comments.unshift(comment);

      post.save(function(err, post) {
        if(err) {console.err(err)};

        comment.save(function(err, post) {
          if(err) {console.err(err)};

          res.redirect(`/rooms/${room.id}`);
        });
      });
    });
  });
});

module.exports = router;

