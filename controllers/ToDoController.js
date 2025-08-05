const fs = require('fs')
const { generateToken } = require('../middlewares/auth')

class todoController{

    constructor(con) {
        this.con = con

        this.novaTarefa = this.novaTarefa.bind(this)
        this.excluirTarefa = this.excluirTarefa.bind(this)
        this.atualizarTarefa = this.atualizarTarefa.bind(this)
        this.exibirTarefas = this.exibirTarefas.bind(this)
    }

    novaTarefa(req, res) {
        const { mensagem } = req.body
        const id = req.id.id
        const status = 0

        let date = new Date()
        date = date.toISOString()
        date = date.slice(0, 19)

        const query = `INSERT INTO lista (id_usuario, mensagem, status, data_cadastro, data_atualizacao) VALUES ("${id}", "${mensagem}", "${status}", "${date}", "${date}")`
        this.con.query(query, function (err) {
            if (err) { res.send(`Erro ao inserir: ${err}`) }
            else { res.send(`Sua tarefa foi enviada: ${mensagem}`) }
        })
    }

    excluirTarefa(req, res) {


    }

    atualizarTarefa(req, res) {
        

    }

    exibirTarefas(req, res){
        const id = req.id.id

        const query = `SELECT mensagem, status FROM lista WHERE id_usuario = "${id}"`

        this.con.query(query, function (err, result) {
            if (err) { res.send(`Erro ao exibir: ${err}`) }
            else { res.send(result) }
        })
    }
}

module.exports = todoController