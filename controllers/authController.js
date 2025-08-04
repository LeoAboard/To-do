const jwt = require('jsonwebtoken');
const SECRET = '123'

function generateToken(id){     
    let token = jwt.sign(
        {id: id},
        SECRET,
        {expiresIn: '5d'}
    )

    return token
}

function authToken(req, res, next){             

    const token = req.cookies.token

    if(!token){
        res.send("Usuário nao logado")
        return
    }

    let payload = jwt.verify(token, SECRET)

    if(!payload){
        res.send("Erro de token")
        return
    }

    req.id = payload
    next()
}

module.exports = { generateToken, authToken }