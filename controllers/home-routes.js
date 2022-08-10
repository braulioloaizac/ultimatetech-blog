const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User} = require('../models');

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
  
  res.render('login');
  // Post.findAll({
  //     attributes: ['id', 'title', 'content', 'user_id', 'created_at'],
  //     include: [
  //       {
  //         model: User,
  //         attributes: ['id', 'username']
  //       }]
  //   })
  //     .then(dbPostData => {
  //       const posts = dbPostData.map(post => post.get({ plain: true }));
  //       res.render('homepage', { posts })
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  });    


 
  router.get('/signup', (req, res) => {
  
    res.render('signup');
    // Post.findAll({
    //     attributes: ['id', 'title', 'content', 'user_id', 'created_at'],
    //     include: [
    //       {
    //         model: User,
    //         attributes: ['id', 'username']
    //       }]
    //   })
    //     .then(dbPostData => {
    //       const posts = dbPostData.map(post => post.get({ plain: true }));
    //       res.render('homepage', { posts })
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       res.status(500).json(err);
    //     });
    });  
    
module.exports = router;