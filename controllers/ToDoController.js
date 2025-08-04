const fs = require('fs')

function novaTarefa(req, res){

    const filePath = './models/todos.json'
    const id_user = req.id                 
    const {inputTodo} = req.body                  
    const todos = require('../models/todos.json')
    
    if(!fs.existsSync(filePath)){
        fs.writeFileSync(filePath, '[]')
    }

    if(!inputTodo){
        return
    }

    const id = todos.length + 1
    const estado = 'pendente'

    const data = {
        'id': id,
        'id_user': id_user,
        'msg': inputTodo,
        'status': estado
    }

    todos.push(data)

    try{
        fs.writeFileSync(filePath, JSON.stringify(todos, null, 2), 'utf8')
        res.send("Tarefa enviada!")
    }catch(error){
        console.log("Ocorreu um erro", error)
    }
}

function excluirTarefa(req, res){

    const filePath = './models/todos.json'
    const id_user = req.id            
    const {exclude_id} = req.body                    
    const todos = require('../models/todos.json')

    if(!exclude_id){
        res.send("nao recebeu id")
        return
    }

    if(todos.find(todo => todo.id_user == id_user)){              //autorização não funciona pq esse todo.id_user nao existe
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
    const id_user = req.id
    const {alter_id} = req.body
    const todos = require('../models/todos.json')

    if(!alter_id){
        res.send("nao recebeu id")
        return
    }

    if(todos.find(todo => todo.id_user == id_user)){                  //autorização não funciona pq esse todo.id_user nao existe
        const alter_todo = todos.find(todo => todo.id == alter_id)

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

module.exports = { novaTarefa, excluirTarefa, atualizarTarefa }