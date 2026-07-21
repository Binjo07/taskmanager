const taskTitle = document.getElementById('taskTitle')
const taskDesc = document.getElementById('taskDesc')
const prioritySelect = document.getElementById('prioritySelect')
const addBtn = document.getElementById('addBtn')
const taskList = document.getElementById('taskList')
    const alphabeticFilter = document.getElementById('alphabeticFilter')
    const dateFilter = document.getElementById('dateFilter');
    const completedStatus = document.getElementById('completedStatus')
    const titleFilter = document.getElementById('titleFilter');
    const priorityFilter = document.getElementById('priorityFilter')



let editingId = null; 

function validateInput(){
    const taskInput = taskTitle.value.trim()
    const descInput = taskDesc.value.trim();
    const priorityInput = prioritySelect.value
    
    if (!taskInput || descInput.length > 50 || !priorityInput ){
        alert('Please enter all fields correctly')
        return
    }
    return true

}

function buildandAddTaskToArray(){
     if(!validateInput()) return 
     const taskInput = taskTitle.value.trim()
    const descInput = taskDesc.value.trim();
    const priorityInput = prioritySelect.value

            let task = ({
            id: crypto.randomUUID(),
            title : taskInput,
            desc: descInput,
            priority: priorityInput,
            completed: false,
            createdAt : Date.now()
        })

   const isDuplicate = tasks.find(task=> task.title === taskInput)
   if (isDuplicate){
    const proceed = confirm(`Task: ${isDuplicate.title} already exists, Add anyway?`)
    if (proceed){
        tasks.push(task)
    } else {
        return
    }
   } else{
    tasks.push(task)
   }

   console.log(task)

}



function updateExistingTask(id){
        const taskInput = taskTitle.value.trim()
    const descInput = taskDesc.value.trim();
    const priorityInput = prioritySelect.value

    tasks = tasks.map((task)=> {
        if (task.id === id){
            return {
            ...task,
            title : taskInput,
            desc: descInput,
            priority : priorityInput
        }}
        return task
    

    })
    editingId = null;
  
    
}


function addTask() {
    if (editingId === null){
        buildandAddTaskToArray()
    }else{
        updateExistingTask(editingId)
        

    }

    save()
    addBtn.textContent = 'ADD TASK'
    clearForm()
   renderUI(tasks)
}

function clearForm(){
    taskTitle.value = '';
    taskDesc.value = ''; 
}


function edit(id){
    const taskToFind = tasks.find(task=> task.id === id)
    if(!taskToFind) return
    taskTitle.value = taskToFind.title;
    taskDesc.value = taskToFind.desc;
    prioritySelect.value = taskToFind.priority
    editingId = id
    addBtn.textContent = 'SAVE'
    taskTitle.focus()

    
}

function calculateStats (array){
    const total= array.length

        const completed = array.reduce((acc, curr)=> {
        return acc + (curr.completed ? 1 : 0)
    },0)
       

        const remaining = array.length - completed

        const rate = total === 0 ? 0 : ((completed/total) * 100).toFixed(2)

        return {completed, remaining, total, rate}
}

function renderUI(array){
    const fragment = document.createDocumentFragment()
    taskList.innerHTML = '';
    array.forEach((task)=>{
        const span = document.createElement('span')
        const li = document.createElement('li')
        li.dataset.taskId = task.id
        span.textContent = `Task : ${task.title} || Description: ${task.desc} || Priority: ${task.priority}`

        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'DELETE'
    
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox'
        checkbox.checked = task.completed

        if(task.completed){
            li.classList.add('completed')
            span.textContent += `|| (✅Task Completed)`
            span.style.color = 'green'
        }

        const editBtn = document.createElement('button');
        editBtn.textContent = 'EDIT';


        const stats = calculateStats(array)
        document.getElementById('totalTasks').textContent = `Total Tasks: ${stats.total}`
        document.getElementById('completedTasks').textContent = `Completed Tasks: ${stats.completed}`
        document.getElementById('remainingTasks').textContent = `Remaining Tasks: ${stats.remaining}`
        document.getElementById('completionRate').textContent = `Completion Rate: ${stats.rate}%`

        li.append(span, deleteBtn, editBtn, checkbox)
        fragment.append(li)
    })
        
    taskList.append(fragment)
    
    
}

function deleteTasks (id){
    tasks = tasks.filter(task=> task.id !== id)
    save()
    renderUI(tasks)
}

function completeTasks(id){
    tasks = tasks.map(task => task.id === id ? {...task, completed : !task.completed} : task)
    save()
    renderUI(tasks)
}



function applyFiltersAndSort(tasks, {priority, alpha, date, status, title}){
   let processedTasks = [...tasks]

    if(priority !== 'ALL'){
        processedTasks = processedTasks.filter(task=> task.priority === priority)
    }

    if (alpha === 'A-Z'){
        processedTasks = processedTasks.sort((a,b)=>{
            return a.title.localeCompare(b.title)
        })
    }else if (alpha === 'Z-A'){
        processedTasks = processedTasks.sort((a,b)=>{
            return b.title.localeCompare(a.title)
        })
    }
    

    if(date === 'ascending'){
        processedTasks = processedTasks.sort((a,b)=>{
            return a.createdAt - b.createdAt
        })
    }else if (date === 'descending'){
        processedTasks = processedTasks.sort((a,b)=>{
            return b.createdAt - a.createdAt
        })
    }

    if (status === 'completed'){
        processedTasks = processedTasks.filter(task=> task.completed === true)
    } else if(status === 'active') {
        processedTasks = processedTasks.filter(task=> task.completed === false)
    } 

    if(title){
        processedTasks = processedTasks.filter(task=> task.title.toLowerCase().includes(title))
    }

    return processedTasks 
}
    
function getProcessedData(){

    let data = {
        priority : priorityFilter.value,
        alpha : alphabeticFilter.value,
        date : dateFilter.value,
        status : completedStatus.value,
        title : titleFilter.value.trim().toLowerCase()
    }

    const processedData = applyFiltersAndSort(tasks, data)

    renderUI(processedData)
}
addBtn.addEventListener('click', addTask)
taskList.addEventListener('click', (event) => {
    const li = event.target.closest('li')
    if (!li) return
    const taskId = li.dataset.taskId
    const target = event.target
    if(target.matches('button')){
        if(target.textContent === 'DELETE'){
            deleteTasks(taskId)
        } else if (target.textContent === 'EDIT'){
            edit(taskId)
        }
    } else if (target.type === 'checkbox'){
        completeTasks(taskId)
    }
})
renderUI(tasks)
priorityFilter.addEventListener('change', getProcessedData)
alphabeticFilter.addEventListener('change', getProcessedData)
dateFilter.addEventListener('change', getProcessedData)
completedStatus.addEventListener('change', getProcessedData)
titleFilter.addEventListener('input', getProcessedData)