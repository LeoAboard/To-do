const fs = require('fs')
const { generateToken } = require('../middlewares/auth')

class userController {

    constructor(con) {
        this.con = con

        this.exibirUsuario = this.exibirUsuario.bind(this)
        this.saveUser = this.saveUser.bind(this)
        this.userLogin = this.userLogin.bind(this)
        this.atualizarUsuario = this.atualizarUsuario.bind(this)
        this.excluirUsuario = this.excluirUsuario.bind(this)
    }

    exibirUsuario(req, res) {
        const { nome } = req.body

        const query = `SELECT nome, email FROM usuario WHERE nome = "${nome}"`

        this.con.query(query, function(err, result) {
            if(err) { res.send(`Erro ao exibir: ${err}`) }
            else{ res.send(result) }
        })

        return
    }

    async saveUser(req, res) {
        const { nome, email, senha } = req.body

        let date = new Date()
        date = date.toISOString()
        date = date.slice(0, 19)

        const aut_query = `SELECT email FROM usuario WHERE email = "${email}"`

        let resultado = await new Promise((resolve, reject) => {
            this.con.query(aut_query, (err, result) => {
                if(err) return reject(err);
                return resolve(result)
            })
        })

        if(resultado[0] && resultado[0].email == email){
            res.send("Usuário já cadastrado")
            return
        }

        const query = `INSERT INTO usuario (nome, email, senha, data_cadastro, data_atualizacao) VALUES ("${nome}", "${email}", "${senha}", "${date}", "${date}")`
        this.con.query(query, function (err) {
            if(err){ res.send(`Erro ao inserir: ${err}`) }
            else{ res.send(`Usuário ${nome} cadastrado com sucesso!`) }
        })

        return
    }

    async userLogin(req, res) {
        const { email, senha } = req.body
        const aut_query = `SELECT id, nome, email, senha FROM usuario WHERE email = "${email}" AND senha = "${senha}"`

        let resultado = await new Promise((resolve, reject) => {
            this.con.query(aut_query, (err, result) => {
                if(err) return reject(err);
                return resolve(result)
            })
        })

        if(!resultado[0]){
            res.send("Email ou senha incorretos")
            return
        }

        const token = generateToken(resultado[0].id)

        res.cookie('token', token, {                  //envio do token para o cliente
            httpOnly: true,
            secure: false,
            maxAge: 5 * 24 * 60 * 60 * 1000
        })

        res.send(`Seja bem vindo ${resultado[0].nome}`)
        return
    }

    async atualizarUsuario(req, res) {
        const { novoNome, novoEmail, novaSenha } = req.body

        let date = new Date()
        date = date.toISOString()
        date = date.slice(0, 19)

        const id = req.id.id

        if(novoNome){
            const query = `UPDATE usuario SET nome = "${novoNome}", data_atualizacao = "${date}" WHERE id = ${id};`

            this.con.query(query, function(err){
                if(err) { res.send(`Erro ao atualizar: ${err}`)}
                else{res.send(`Nome atualizado com sucesso: ${novoNome}!`)}
            })

            return
        }

        if(novaSenha){
            const query = `UPDATE usuario SET senha = "${novaSenha}", data_atualizacao = "${date}" WHERE id = ${id};`

            this.con.query(query, function(err){
                if(err) { res.send(`Erro ao atualizar: ${err}`)}
                else{res.send(`Senha atualizada com sucesso!`)}
            })

            return
        }

        if(novoEmail){

            const aut_query = `SELECT email FROM usuario WHERE email = "${novoEmail}"`
            let resultado = await new Promise((resolve, reject) => {
                this.con.query(aut_query, (err, result) => {
                    if(err) return reject(err);
                    return resolve(result)
                })
            })
            if(resultado[0] && resultado[0].email == novoEmail){
                res.send("Este email já está em uso.")
                return
        }

            const query = `UPDATE usuario SET email = "${novoEmail}", data_atualizacao = "${date}" WHERE id = ${id};`
            this.con.query(query, function(err){
                if(err) { res.send(`Erro ao atualizar: ${err}`)}
                else{res.send(`Email atualizado com sucesso: ${novoEmail}`)}
            })

            return
        }

        res.send("Erro: Impossivel atualizar este dado")
        return
    }

    excluirUsuario(req, res) {
        const { email, senha } = req.body
        const id = req.id.id

        let query = `DELETE FROM lista WHERE id_usuario = "${id}"`
        this.con.query(query, function(err){
            if(err){ res.send(err) }
        })

        query = `DELETE FROM usuario WHERE email = "${email}" AND senha = "${senha}" AND id = "${id}"`
        this.con.query(query, function(err, result){
            if(err || result.affectedRows == 0){ res.send('Você não pode excluir esta conta'); }
            else{ res.cookie('token', '', {expires: new Date(0)}); res.send("Usuário excluido com sucesso") }
        })

        return
    }
}

module.exports = userController 