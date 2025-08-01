const fs = require('fs')
const { JSDOM } = require('jsdom')

function novaTarefa(req, res){

    const filePath = './models/todos.json'
    const {id_user} = req.session                            //COMO MANTER USUÁRIO LOGADO?

    if(!id_user){
        res.send("Usuário não logado")
        return
    }
    
    if(!fs.existsSync(filePath)){
        fs.writeFileSync(filePath, '[]')
    }

    let todos = require('../models/todos.json')

    const {inputTodo} = req.body

    if(!inputTodo){
        return
    }

    const id = todos.length + 1
    let estado = 'pendente'

    let data = {
        'id': id,
        'id_user': id_user,
        'msg': inputTodo,
        'status': estado
    }

    todos.push(data)

    try{
        fs.writeFileSync(filePath, JSON.stringify(todos, null, 2), 'utf8')
        //exibirTarefa(inputTodo)
        //res.redirect('http://localhost:3000/lista')
        res.send("Tarefa enviada!")
    }catch(error){
        console.log("Ocorreu um erro", error)
    }
}

function excluirTarefa(req, res){

    const filePath = './models/todos.json'
    const {id_user} = req.session                       

    if(!id_user){
        res.send("Usuário não logado")
        return
    }

    const {exclude_id} = req.body                    
    const todos = require('../models/todos.json')

    if(todos.find(todo => todo.id_user == id_user)){       //autorização
        todos = todos.filter(todo => todo.id != exclude_id) 
    }else{
        res.send("Você não pode excluir esta tarefa!")
    }

    try{
        fs.writeFyleSync(filePath, JSON.stringify(todos, null, 2), 'utf8')
        res.send(todos)
    }catch(error){
        console.log("Ocorreu um erro", error)
    }
}

function atualizarTarefa(req, res){

    const filePath = './models/todos.json'               
    const {id_user} = req.session

    if(!id_user){
        res.send("Usuário não logado")
        return
    }

    const {alter_id} = req.body
    const todos = require('..models/todos.json')

    if(todos.find(todo => todo.id_user == id_user)){                  //autorização
        const alter_todo = todos.find(todo => todo.id == alter_id)    //busca o todo a ser alterado

        if(alter_todo.status == "pendente")
            alter_todo.status = "concluido"
        else{
            alter_todo.status = "pendente"
        }

        todos.push(alter_todo)

    }else{
        res.send("Você não pode modificar essa tarefa!")
    }

    try{
        fs.writeFyleSync(filePath, JSON.stringify(todos, null, 2), 'utf8')
        res.send(todos)
    }catch(error){
        console.log("Ocorreu um erro", error)
    }
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