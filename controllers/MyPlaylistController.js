const { Playlist, Song } = require('../models')

class MyPlaylistController {
  static index(req, res) {
    Playlist.myList(req.session.userId, [Song])
    .then(data=>{
      console.log(data[0])
      res.render('my_playlist/index', { data, songId: null })
    }).catch(error=>{
      res.render('error', {error})      
    })
  }

  static addSong(req, res) {
    const songId = +req.params.id
    const userId = +req.session.userId
    Playlist.findAll({ where: {UserId: userId, SongId: songId}})
    .then(data=>{
      if (data.length == 0) {      
        return Playlist.create({ 
          UserId: userId, SongId: songId 
        })
      }
      return null;
    }).then(data=>{
      res.redirect('/my_playlist')
    }).catch(error=>{
      res.render('error', {error})      
    })
  }

  static play(req, res) {
    Playlist.myList(req.session.userId, [Song])
    .then(data=>{
      res.render('my_playlist/index', { data, songId: req.params.id })
    }).catch(error=>{
      res.render('error', {error})      
    })
  }

  static remove(req, res) {
    Playlist.destroy({ where: { SongId: req.params.id, UserId: req.session.userId }})
    .then(data=>{
      res.redirect('/my_playlist')
    }).catch(error=>{
      res.render('error', {error})      
    })
  }  
}


module.exports = MyPlaylistController