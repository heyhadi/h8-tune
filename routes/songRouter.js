const express = require('express');
const router = express.Router();
const SongController = require('../controllers/SongController');

router.get('/', SongController.songList)
router.get('/add', SongController.addGet)
router.post('/add', SongController.addSong)
router.get('/:id/delete', SongController.destroy)
router.get('/edit/:id', SongController.editForm)
router.post('/edit/:id', SongController.editSong)
router.get('/favourite/:id', SongController.showFavorite)
router.get('/:id/like', SongController.like)

module.exports = router