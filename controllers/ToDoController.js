const fs = require('fs')

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
        this.con.query(query, function(err){
            if(err){ res.send(`Erro ao inserir: ${err}`) }
            else{ res.send(`Sua tarefa foi enviada: ${mensagem}`) }
        })

        return
    }

    excluirTarefa(req, res) {
        const { id_msg } = req.body
        const id_user = req.id.id

        const query = `DELETE FROM lista WHERE id = "${id_msg}" AND id_usuario = "${id_user}"`
        this.con.query(query, function(err, result){
            if(err || result.affectedRows == 0) res.send(`Você não pode excluir essa mensagem`);
            else{ res.send("Mensagem excluida com sucesso" )}
        })

        return
    }

    async atualizarTarefa(req, res) {
        const { id_msg } = req.body
        const id_user = req.id.id

        let date = new Date()
        date = date.toISOString()
        date = date.slice(0, 19)

        let query = `SELECT status FROM lista WHERE id = "${id_msg}" AND id_usuario = "${id_user}"`
        let status = await new Promise((resolve, reject) => {
            this.con.query(query, (err, result) => {
                if(err) return reject(err);
                return resolve(result)
            })
        })

        if(status.length == 0){
            res.send(`Você não pode modificar essa tarefa`)
            return
        }

        if(status[0].status == 1){
            status[0].status--;
        }else{
            status[0].status++;
        }

        query = `UPDATE lista SET status = "${status[0].status}", data_atualizacao = "${date}" WHERE id = "${id_msg}" AND id_usuario = "${id_user}"`
        this.con.query(query, function(err, result){
            if(err || result.affectedRows == 0) res.send(`Você não pode modificar essa tarefa`);
            else{ res.send(`Tarefa alterada: ${status[0].status}`) }
        })

        return
    }

    exibirTarefas(req, res){
        const id = req.id.id

        const query = `SELECT id, mensagem, status FROM lista WHERE id_usuario = "${id}"`

        this.con.query(query, function(err, result){
            if(err){ res.send(`Erro ao exibir: ${err}`) }
            else{ res.send(result) }
        })

        return
    }
}

module.exports = todoController