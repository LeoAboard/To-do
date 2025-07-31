const fs = require('fs')
const { JSDOM } = require('jsdom')

function novaTarefa(req, res){

    const filePath = './models/todos.json'
    
    if(!fs.existsSync(filePath)){
        fs.writeFileSync(filePath, '[]')
    }

    let todos = require('../models/todos.json')
    let users = require('../models/usuarios.json') //vai ser utilizado para obter o id do usuário

    const {inputTodo} = req.body
    const id = todos.length + 1
    let estado = 'pendente'

    //acho que vou delegar a função de modificar o estado para o atualizarTarefa()
    //como obter o id do usuário correto?

    let data = {
        'id': id,
        'id_user': '',
        'msg': inputTodo,
        'status': estado
    }

    todos.push(data)

    try{
        fs.writeFileSync(filePath, JSON.stringify(todos, null, 2), 'utf8')
        //exibirTarefa(inputTodo)
        res.send('Tarefa enviada')
    }catch(error){
        console.log("Ocorreu um erro", error)
    }
}

function excluirTarefa(req, res){

    const filePath = './models/todos.json'

    todos = require('../models/todos.json')
    todos.find(exclude_id => todos.id == exclude_id)        //COMO USUÁRIO DEVE ME PASSAR O ID A SER EXCLUIDO?
                                                            //UTILIZAR A FUNÇÃO FILTER() PARA EXCLUIR O ELEMENTO QUE NAO ATENDE
}

function atualizarTarefa(req, res){

    const filePath = './models/todos.json'                 //USUARIO PODE ALTERAR O ESTADO ENTRE PENDENTE <-> CONCLUIDO
}

// function exibirTarefa(msg){
//     const filePath = './routes/formTodo.html'
//     const html = fs.readFileSync(filePath, 'utf-8')
//     const dom = new JSDOM(html)
//     const document = dom.window.document

//     let lista = document.getElementById("minhaLista")     //NAO CONSIGO ATUALIZAR A LISTA HTML EM TEMPO REAL
//     let li = document.createElement("li")
//     li.appendChild(document.createTextNode(msg))
//     lista.appendChild(li)

//     fs.writeFileSync(filePath, document.body.innerHTML)
// }

module.exports = { novaTarefa, excluirTarefa, atualizarTarefa }