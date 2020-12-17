const { User, Song, Playlist } = require('../models')


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
         .catch(err => {
             res.send(err)
         })
     }
 

}

module.exports = Controller