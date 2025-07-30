const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let { saveUser, verifyUser } = require('./controllers/UserController')
let { novaTarefa } = require('./controllers/ToDoController')

/*---------------ROTAS--------------*/

app.get('/', function(req, res){
    res.send("SIGN IN / SIGN UP")
})

app.get('/signin', function(req, res){
    res.sendFile(__dirname + '/routes/formSignin.html')
})

app.get('/lista', function(req, res){
    res.sendFile(__dirname + '/routes/formTodo.html')
})

app.post('/lista', novaTarefa)

app.get('/signup', function(req, res){
    res.sendFile(__dirname + '/routes/formSignup.html')
})

app.post('/signup', saveUser)

/*--------------SERVIDOR-------------*/

app.listen(3000, function(){
    console.log('Servidor operando em http://localhost:3000/')
})