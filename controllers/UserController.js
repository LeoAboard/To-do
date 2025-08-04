const fs = require('fs')

let { generateToken } = require('./authController')

function saveUser(req, res){

    const filePath = './models/usuarios.json'

    if(!fs.existsSync(filePath)){
        fs.writeFileSync(filePath, '[]')
    }
    
    let users = require('../models/usuarios.json')

    const {nome, email, senha} = req.body
    const id = users.length + 1
    
    if(users.some(user => user.email === email)){
        res.send("Email já cadastrado!")
        return
    }

    let data = {
        'id': id,
        'name': nome,
        'email': email,
        'password': senha
    }

    users.push(data)

    try{
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8')
        res.send(`Usuário ${nome} cadastrado!`)
    }catch(error){
        console.log("Ocorreu um erro", error)
    }
}

function userLogin(req, res){

    const filePath = './models/usuarios.json'

    if(!fs.existsSync(filePath)){
        res.send("Usuário não cadastrado")
        return
    }

    let users = require('../models/usuarios.json')
    const {id, email, senha} = req.body
    
    const user = users.find(user => user.email == email && user.password == senha)

    if(!user){
        res.send("Email ou senha incorretos")
        return
    }
    
    const token = generateToken(id)

    res.cookie('token', token, {              //envio do token para o cliente
        httpOnly: true,
        secure: false,
        maxAge: 5*24*60*60*1000
    })

    users.find(function(user){if(user.email == email){res.send(`Bem vindo ${user.name}`)}})
    return
}

module.exports = { saveUser, userLogin }