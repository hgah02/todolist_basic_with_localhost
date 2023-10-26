const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const ulElement = $('#app ul')
const inputBtn = $('input')
const note = $('.note')
const textNote = $$('.note span')
const notification = $('#notification p')
const form = $('#container')
const _this=this
var i = 0 
var html = ''

function addList(){
    form.addEventListener("submit", function(e){
        e.preventDefault()
        if(inputBtn.value){
            html += `
            <li class="note" >
                <span>${inputBtn.value}</span>
                <button class="deleteBtn"  id="${i}"><i class="fa-solid fa-trash"></i></button>
            </li>
            `
            localStorage.setItem(`${i}`,`
            <li class="note">
                <span>${inputBtn.value}</span>
                <button class="deleteBtn"  id="${i}"><i class="fa-solid fa-trash"></i></button>
            </li>
            `
            )
            i ++
        }
        ulElement.innerHTML = html
        notification.innerHTML = `
        You have ${i} pending tasks
        `
        inputBtn.value = ''
    })
}

function render(){
    let j = 0
    while(j<localStorage.length){
        html += localStorage.getItem(`${j}`)
        if(localStorage.getItem(`${j}`) != '' ) i++
        j++
    }
    ulElement.innerHTML = html
    notification.innerHTML = `
    You have ${i} pending tasks
    `
}

function handleNote(){
    ulElement.onclick = function(e){ 
        if(e.target.tagName == 'SPAN'){
            if(e.target.parentElement.getAttribute("class") == 'note'){
                e.target.parentElement.removeAttribute('class')
                e.target.parentElement.setAttribute("class", "completed")
            }else{
                e.target.parentElement.removeAttribute('class')
                e.target.parentElement.setAttribute("class", "note")
            }
            html = ulElement.innerHTML
            let key = e.target.parentElement.children[1].getAttribute('id');
            localStorage.setItem(key,`<li class="${e.target.parentElement.getAttribute('class')}">
                ${e.target.parentElement.innerHTML}
                </li>
            `)
        }


        // xoa note
        if(e.target.closest('.deleteBtn')){
            let idElelemnt = e.target.closest('.deleteBtn').getAttribute('id')
            localStorage.removeItem(idElelemnt)
            localStorage.setItem(idElelemnt,'')
            e.target.closest('.deleteBtn').parentElement.remove()
            i--
            notification.innerHTML = `
            You have ${i} pending tasks
            `
            html = ulElement.innerHTML
        }
    }
}

function clearData(){
    html = ''
    i = 0
    localStorage.clear()
    ulElement.innerHTML = ``
    notification.innerHTML = `
    You have ${0} pending tasks
    `
}

function app(){
    render()
    addList()
    handleNote()
}

app()






