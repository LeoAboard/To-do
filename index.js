const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(express.json())

const todoRoutes = require('./routes/todoRoutes')
const userRoutes = require('./routes/userRoutes')

/*---------------ROTAS--------------*/

todoRoutes(app)
userRoutes(app)

/*--------------SERVIDOR-------------*/

app.listen(3000, function(){
    console.log('Servidor operando em http://localhost:3000/')
})