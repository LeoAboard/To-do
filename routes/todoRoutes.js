const todoController = require('../controllers/ToDoController')
const { authToken } = require('../middlewares/auth')
const con = require('../models/connection')

MyTodoController = new todoController(con)

const todoRoutes = (app) => {
    app.get('/lista', MyTodoController.exibirTarefas)
    app.post('/lista', authToken, MyTodoController.novaTarefa)
    app.put('/lista', authToken, MyTodoController.atualizarTarefa)
    app.delete('/lista', authToken, MyTodoController.excluirTarefa)
}

module.exports = todoRoutes