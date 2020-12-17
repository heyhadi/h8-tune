const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller')

router.get('/login', Controller.login)
router.get('/register', Controller.register)
router.post('/register', Controller.saveRegister)

// router.get('/', Controller.home)

// //Song
// router.get('/song/add', Controller.formSong)
// router.post('/song/add', Controller.addSong)
// router.get('/song/edit/:id', Controller.editForm)
// router.post('/song/edit/:id', Controller.editSong)
// router.get('/song/delete/:id', Controller.destroy)

// router.get('/users', Controller.userList)
// router.get('/users/add', Controller.addNewUser)
// router.post('/users/add', Controller.saveNewUser)

// router.get('/users/delete/:id', Controller.destroyUser)

// router.get('/tutorials/favorite/:id', Controller.showFavorite)

// router.get('/like/:id', Controller.like)




module.exports = router