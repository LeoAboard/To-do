const express = require('express')
const app = express()

const routes = require('./routes/routes')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const cookieParser = require('cookie-parser')
app.use(cookieParser())

/*---------------ROTAS--------------*/

app.use('/', routes)
app.use('/signin', routes)
app.use('/signup', routes)

/*--------------SERVIDOR-------------*/

app.listen(3000, function(){
    console.log('Servidor operando em http://localhost:3000/')
})