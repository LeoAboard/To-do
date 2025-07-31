const fs = require('fs')

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
    const {id, nome, email, senha} = req.body
    
    if(users.find(user => user.email == email && user.password == senha)){
        users.find(function(user){if(user.email == email){res.send(`Bem vindo ${user.name}`)}})
    }else{
        res.send("Email ou senha incorretos")
    }
}


module.exports = { saveUser, userLogin }