const express = require('express')
const router = require('./routes')
const session = require('express-session')

const app = express()
const port = process.env.PORT || 3002

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'pair project',
  resave: false,
  saveUninitialized: true,
}))
app.use('/', router)



app.listen(port, ()=>{
  console.log(`this app running on port: ${port}`);
}) 