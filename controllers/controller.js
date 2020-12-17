const { User, Song, Playlist, FavouritSong } = require('../models')
const tuannyonya = require('../helper/tuannyonya')



// Login - home
class Controller {

    static home(req, res) {
            res.render('home')
    }
    static register(req, res) {
      let alert = req.query
      res.render('register', {alert})
    }


    static saveRegister(req, res) {
        let obj = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: req.body.password,
            gender: req.body.gender,
            role: req.body.role,
        }

        User.create(obj)
            .then(result => {
                res.redirect('/register?message=register success')
            })
            .catch(err => {
                res.send(err)
            })
    }
    static login(req, res) {
      let alert = req.query
      res.render('login', {alert})

    }

    static loginPost(req, res) {
        User.findOne({where: { username: req.body.username, password: req.body.password }})
         .then(data => {
             req.session.username = data.username
             req.session.user = data.id
             res.redirect('/')
         })
         .catch(error => {
            res.redirect(`/login?message=Username or Password invalid `)
         })
     }


     //CRUD SONG

    static songList(req, res){
       let alert = req.query
       Song.findAll({order : [['released_date', 'DESC']]})
        .then(data=>{
          res.render('songs', {data, alert})  
          
        }).catch(error=>{
          res.render('error', {error})      
        })
    }

    static addGet(req, res){
        let alert = req.query
        res.render('addSong', {alert})
    }
    
    static addSong(req,res){
        Song.create({
          title: req.body.title,
          genre: req.body.genre,
          released_date: req.body.released_date,
          artist: req.body.artist
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
            res.render('edit', {data})
          }).catch(error=>{
            res.render('error', {error})
          })
     }
 
  

     static editSong(req,res){
        // res.send(req.body)
        Song.update({
          title: req.body.title,
          genre: req.body.genre,
          released_date: req.body.released_date,
          artist: req.body.artist
        }, { where: { id: Number(req.params.id) }})
        .then(()=>{        
          res.redirect(`/songs?message=Song with id: ${req.params.id} has been succeessfully edited!&type=success`)
        })
        .catch(error=>{
          res.render('error', {error})
        })
      }

      //favourite song

      static showFavorite(req, res) {
        let id = +req.params.id
       
        Song.findByPk(id, {include: [User]})
        .then( value => {
            console.log(value);
            res.render('favorite', { value, tuannyonya})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static like(req, res) {
      let paramId = +req.params.id
      // console.log(req.session.user);
      // console.log(paramId);
      
      let obj = {
          SongId: paramId,
          UserId: req.session.user
      }


      FavouritSong.findOne({
          where: {
              SongId: paramId, UserId: req.session.user
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

module.exports = Controller