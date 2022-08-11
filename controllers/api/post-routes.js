const router = require('express').Router();

const { Post, User } = require('../../models');

// get all posts
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    attributes: ['id', 'title', 'content', 'user_id', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['id', 'username']
      }]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // expects {title: 'Taskmaster goes public!', user_id: 1}
  Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id
    //user_id: req.body.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
