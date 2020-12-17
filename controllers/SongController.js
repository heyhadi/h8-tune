const tuannyonya = require('../helper/tuannyonya')
const { User, Song, FavouritSong } = require('../models')

class SongController {
  static songList(req, res){
    let alert = req.query
    Song.findAll({order : [['released_date', 'DESC']]})
    .then(data=>{
      res.render('songs/songs', {data, alert})  
      
    }).catch(error=>{
      res.render('error', {error})      
    })
  }

  static addGet(req, res){
    let alert = req.query
    res.render('songs/addSong', {alert})
  }
  
  static addSong(req,res){
    Song.create({
      title: req.body.title,
      genre: req.body.genre,
      released_date: req.body.released_date,
      artist: req.body.artist,
      youtubeId: req.body.youtubeId
    })
      .then(()=>{
        let msg = `${req.body.title} has been successfully added to list songs`
        res.redirect(`/songs?message=${msg}&type=success`)
      }).catch(()=>{
        res.redirect(`/songs/add?message=Cannot add song`)
      })
  }

  static destroy(req, res) {
    let id = +req.params.id

    Song.destroy({where: {id}})
    .then(()=>{
      res.redirect(`/songs?message=song with id: ${req.params.id} has been deleted!&type=success`)
    }).catch(error=>{
      res.render('error', {error})
    })
  }

  static editForm(req, res) {
    let paramId = req.params.id
      
    Song.findByPk(paramId)
    .then(data=>{
      res.render('songs/edit', {data})
    }).catch(error=>{
      res.render('error', {error})
    })
  }

  static editSong(req,res){
    Song.update({
      title: req.body.title,
      genre: req.body.genre,
      released_date: req.body.released_date,
      artist: req.body.artist,
      youtubeId: req.body.youtubeId
    }, { where: { id: Number(req.params.id) }})
    .then(()=>{        
      res.redirect(`/songs?message=Song with id: ${req.params.id} has been succeessfully edited!&type=success`)
    })
    .catch(error=>{
      res.render('error', {error})
    })
  }

  static showFavorite(req, res) {
    let id = +req.params.id
   
    Song.findByPk(id, {include: [User]})
    .then( value => {
        console.log(value);
        res.render('songs/favorite', { value, tuannyonya })
    })
    .catch(err => {
        res.send(err)
    })
  }

  static like(req, res) {
    let paramId = +req.params.id
    
    let obj = {
      SongId: paramId,
      UserId: req.session.user
    }


    FavouritSong.findOne({
      where: {
        SongId: paramId, UserId: req.session.userId
      }
    })
    .then(results => {
      if (results) {
        res.redirect(`/songs/favourite/${paramId}`)
      } else {
        FavouritSong.create(obj)
        .then(data => {
            res.redirect(`/songs/favourite/${paramId}`)
        })
      }
    })
    .catch(err => {
        res.send(err.message)
    })
  }  
}

module.exports = SongController