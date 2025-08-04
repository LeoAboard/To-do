const userController = require('../controllers/UserController')
const con = require('../models/connection')

MyUserController = new userController(con)

const userRoutes = (app) => {
    app.post('/signup', MyUserController.saveUser)
    app.post('/signin', MyUserController.userLogin)
    app.get('/usuario', MyUserController.exibirUsuario)
    app.put('/usuario', MyUserController.atualizarUsuario)
    app.delete('/usuario', MyUserController.excluirUsuario)
}

module.exports = userRoutes