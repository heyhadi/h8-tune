const { User, Song, Playlist } = require('../models')



// Login - home
class Controller {

    static home(req, res) {
            res.render('home')
    }
    static register(req, res) {
        res.render('register')
    }


    static saveRegister(req, res) {
        let obj = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: req.body.password,
            gender: req.body.gender,
        }

        User.create(obj)
            .then(result => {
                res.redirect('/register')
            })
            .catch(err => {
                res.send(err)
            })
    }
    static login(req, res) {
        res.render('login')

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
 
     static updateEdit(req, res) {
         
         let obj = {
             title: req.body.title,
             uploader_name: req.body.uploader_name,
         }
         
         let id = +req.params.id
 
         Tutorial.update(obj, {where: {id}})
           .then(data => {
             res.redirect('/')
           })
           .catch(err => {
             res.send(err)
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
 

}

module.exports = Controller