const fs = require('fs')
const { generateToken } = require('../middlewares/auth')

class userController{

    constructor(con){
        this.con = con
    }

    exibirUsuario(){

    }

    saveUser(req, res){
   
    }

    userLogin(req, res){

        const token = generateToken(id)

        res.cookie('token', token, {              //envio do token para o cliente
            httpOnly: true,
            secure: false,
            maxAge: 5*24*60*60*1000
        })  
    }

    atualizarUsuario(){

    }

    excluirUsuario(){

    }
}

module.exports = userController 