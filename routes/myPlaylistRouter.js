const express = require('express');
const router = express.Router();
const MyPlaylistController = require('../controllers/MyPlaylistController');

router.get('/', MyPlaylistController.index)
router.get('/songs/:id/add', MyPlaylistController.addSong)
router.get('/songs/:id/play', MyPlaylistController.play)
router.get('/songs/:id/remove', MyPlaylistController.remove)

module.exports = router