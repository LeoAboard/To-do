const userController = require('../controllers/UserController')
const { authToken } = require('../middlewares/auth')
const con = require('../models/connection')

MyUserController = new userController(con)

const userRoutes = (app) => {
    app.post('/signup', MyUserController.saveUser)
    app.post('/signin', MyUserController.userLogin)
    app.get('/usuario', MyUserController.exibirUsuario)
    app.put('/usuario', authToken, MyUserController.atualizarUsuario)
    app.delete('/usuario', authToken, MyUserController.excluirUsuario)
}

module.exports = userRoutes