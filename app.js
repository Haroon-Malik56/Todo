var main = document.getElementById('mainList')
var inputValue = document.getElementById('inp')

firebase.database().ref('todo').on('child_added',function(data) {
        var text = inputValue.value
        var finalText = document.createTextNode(text)
    
        main.value = '' 
    
        var list = document.createElement('p')
        list.setAttribute('class', 'list')
        list.appendChild(finalText)
        main.appendChild(list)
    
       
       //========= Create delete Button
    
        var btnDiv = document.createElement('div')
        var btn = document.createElement('button')
        btn.setAttribute('class', 'btn')
        btn.setAttribute('onClick', 'deleteTodo(this)')
        btn.setAttribute('id',data.val().key)
        var btnText = 'Delete'
        var finalbtnText = document.createTextNode(btnText)
        btn.appendChild(finalbtnText)
    
        //========= Create Edit Button
    
        var editBtn = document.createElement('button')
        editBtn.setAttribute('class', 'btn')
        editBtn.setAttribute('onClick', 'edit(this)')
        editBtn.setAttribute('id',data.val().key)
        var editbtnText = 'Edit'
        var finaleditbtnText = document.createTextNode(editbtnText)
        editBtn.appendChild(finaleditbtnText)

        inputValue.value = ''

        btnDiv.appendChild(btn)
        btnDiv.appendChild(editBtn)
        list.appendChild(btnDiv)
   
})

function add() {
    var text = inputValue.value
    var finalText = document.createTextNode(text)
    var database =  firebase.database().ref('todo')
    var key = database.push().key;
    var todo = {
        value: finalText.nodeValue,
        key: key
    }
    database.child(key).set(todo)
    

   
}

    function deleteTodo(e) {
        var li = e.parentNode.parentNode
        li.remove()
        firebase.database().ref('todo').child(e.id).remove()

    }

    function edit(e) {
        var li = e.parentNode.parentNode
        var editText = prompt('Enter Edit text')
        var edittodo = {
            value: editText,
            key: e.id
        }
        li.firstChild.nodeValue = editText
        firebase.database().ref('todo').child(e.id).set(edittodo)
    }
    function deleteAll() {
        main.innerHTML = ''
    }