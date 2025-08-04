const express = require('express')
const router = express.Router()

const { saveUser, userLogin } = require('../controllers/UserController')
const { novaTarefa, excluirTarefa, atualizarTarefa } = require('../controllers/ToDoController')
const { authToken } = require('../controllers/authController')

router.get('/', function(req, res){
    res.send('SIGN UP / SIGN IN')
})

router.post('signup', saveUser)

router.post('/signin', userLogin)

router.post('/lista', authToken, novaTarefa)

router.put('/lista', authToken, atualizarTarefa)

router.delete('/lista', authToken, excluirTarefa)

module.exports = router