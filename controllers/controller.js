const { User, Song, Playlist } = require('../models')


class Controller {
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

}

module.exports = Controller