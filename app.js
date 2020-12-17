const express = require('express')
const router = require('./routes')
// const session = require('express-session')

const app = express()
const port = 3002

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
// app.use(session({secret: "Shh, its a secret!"}));

app.use('/', router)



app.listen(port, ()=>{
  console.log(`this app running on port: ${port}`);
}) 