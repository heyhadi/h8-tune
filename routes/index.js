const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller')

function authenticate(req, res, next) {
  
    if (req.session.username) {
        next()
    } else {
        res.redirect('/login')
    }
}

router.get('/login', Controller.login)
router.post('/login', Controller.loginPost)
router.get('/register', Controller.register)
router.post('/register', Controller.saveRegister)
router.use(authenticate)
router.get('/', Controller.home)


// //Song
router.get('/songs', Controller.songList)
router.get('/songs/add', Controller.addGet)
router.post('/songs/add', Controller.addSong)
router.get('/songs/:id/delete', Controller.destroy)
router.get('/songs/edit/:id', Controller.editForm)
// router.post('/song/edit/:id', Controller.editSong)
// router.get('/song/delete/:id', Controller.destroy)

// router.get('/users', Controller.userList)
// router.get('/users/add', Controller.addNewUser)
// router.post('/users/add', Controller.saveNewUser)

// router.get('/users/delete/:id', Controller.destroyUser)

// router.get('/tutorials/favorite/:id', Controller.showFavorite)

// router.get('/like/:id', Controller.like)




module.exports = router