function novaTarefa(req, res){

    let li = document.createElement("li")
    let txt = document.createTextNode(inputTodo)

    li.appendChild(txt)

    if(inputTodo === ''){
        alert("Por favor escreva algo!")
    }else{
        document.getElementById("minhaLista").appendChild(li)
    }

    document.getElementById("inputTodo").value = ""

    //adicionar no todos.json
}

// let lista = document.querySelector('ul')
// lista.addEventListener('click', function(event){
//     if(event.target.tagName === 'LI'){
//         event.target.classList.toggle('checked')
//     }
// }, false)