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
        res.send("Usuário não logado")
        return
    }

    const payload = jwt.verify(token, SECRET)

    req.id = payload
    next()
}

module.exports = { generateToken, authToken }