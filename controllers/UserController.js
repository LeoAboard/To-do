function saveUser(req, res){

    const {nome, email, senha} = req.body

    const fs = require('fs')

    let data = {
        'name': nome,
        'email': email,
        'password': senha
    }

    try{
        fs.writeFileSync('./models/usuarios.json', JSON.stringify(data), 'utf8') //overwriting
        res.send(`Usuário ${nome} cadastrado!`)
    }catch(error){
        console.log("Ocorreu um erro", error)
    }
}

function verifyUser(req){

}

module.exports = { saveUser, verifyUser }