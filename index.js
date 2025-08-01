const express = require('express')
const app = express()

const session = require('express-session')
app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false,
        rolling: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let { saveUser, userLogin } = require('./controllers/UserController')
let { novaTarefa, excluirTarefa, atualizarTarefa } = require('./controllers/ToDoController')

/*---------------ROTAS--------------*/

app.get('/', function(req, res){
    res.send("SIGN IN / SIGN UP")
})

app.get('/signin', function(req, res){
    res.sendFile(__dirname + '/routes/formSignin.html')
})

app.post('/signin', userLogin)

app.get('/signup', function(req, res){
    res.sendFile(__dirname + '/routes/formSignup.html')
})

app.post('/signup', saveUser)

app.get('/lista/', function(req, res){
    res.sendFile(__dirname + '/routes/formTodo.html')
})

app.post('/lista', novaTarefa)

app.put('/lista', atualizarTarefa)

app.delete('/lista', excluirTarefa)

/*--------------SERVIDOR-------------*/

app.listen(3000, function(){
    console.log('Servidor operando em http://localhost:3000/')
})