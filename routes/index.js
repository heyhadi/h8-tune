const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller');
const { User } = require('../models');
const homeRouter = require('./homeRouter');
const authRouter = require('./authRouter');
const songRouter = require('./songRouter');
const myPlaylistRouter = require('./myPlaylistRouter');

async function authenticate(req, res, next) {
  if (req.session.userId) {
    res.locals.currentUser = await User.findByPk(req.session.userId)
      next()
  } else {
    res.redirect('/login')
  }
}

router.use('/', authRouter)
router.use(authenticate)
router.use('/', homeRouter)
router.use('/songs', songRouter)
router.use('/my_playlist', myPlaylistRouter)

module.exports = router