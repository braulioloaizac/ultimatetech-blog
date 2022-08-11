const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User } = require('../models');

router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'content', 'user_id', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['id', 'username']
      }]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('homepage', { posts })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {

  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');

});

router.get('/signup', (req, res) => {

  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');

});


router.get('/dashboard', (req, res) => {

  if (req.session.loggedIn) {

    Post.findAll({
      attributes: ['id', 'title', 'content', 'user_id', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        }],
      where: {
        user_id: req.session.user_id
      }
    })
      .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    return;

  } else {
    res.redirect('/')
  }

});

router.get('/dashboardcreate', (req, res) => {

  if (req.session.loggedIn) {
    res.render('dashboardcreate')
    return;
  } else {
    res.redirect('/')
  }

});


module.exports = router;