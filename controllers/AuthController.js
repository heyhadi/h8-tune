const { User } = require('../models')

class AuthController {
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
    }

    User.create(obj)
        .then(result => {
            res.redirect('/login')
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
        req.session.userId = data.id
        res.redirect('/')
    })
    .catch(error => {
        res.redirect(`/login?message=Username or Password invalid `)
    })
  }

  static logout(req, res) {
    req.session.userId = null
    res.redirect('/login')
  }
}

module.exports = AuthController