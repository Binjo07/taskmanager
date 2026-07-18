const taskTitle = document.getElementById('taskTitle')
const taskDesc = document.getElementById('taskDesc')
const prioritySelect = document.getElementById('prioritySelect')
const addBtn = document.getElementById('addBtn')
const taskList = document.getElementById('taskList')

let tasks = JSON.parse(localStorage.getItem('tasks')) || []
let editingId = null; 


function addTasks(){
   const taskInput = taskTitle.value;
    const descInput = taskDesc.value.trim();
    const priorityInput = prioritySelect.value

    if (!taskInput || descInput.length > 50 || !priorityInput ){
        alert('Please enter all fields correctly')
        return
    }
    if (editingId === null){
            tasks.push({
            id: crypto.randomUUID(),
            title : taskInput,
            desc: descInput,
            priority: priorityInput,
            completed: false,
            createdAt : Date.now()
        })
    } else{
        tasks = tasks.map(task=> task.id === editingId ? {...task, title: taskInput, desc: descInput, priority: priorityInput}: task)
        editingId === null;
        

    }
    
    renderUI(tasks)
    save()

}

function edit(id){
    const taskToFind = tasks.find(task=> task.id === id)
    taskTitle.value = taskToFind.title;
    taskDesc.value = taskToFind.desc;
    prioritySelect.value = taskToFind.priority
    editingId = id
    addBtn.textContent = 'SAVE'
    taskTitle.focus()
    save()
    renderUI(tasks)
}

function renderUI(array){
    const fragment = document.createDocumentFragment()
    taskList.innerHTML = '';
    array.forEach((task)=>{
        const span = document.createElement('span')
        const li = document.createElement('li')
        span.textContent = `Task : ${task.title} || Description: ${task.desc} || Priority: ${task.priority}`

        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'DELETE'
        deleteBtn.addEventListener('click', () => deleteTasks(task.id) )
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox'
        checkbox.checked = task.completed
        checkbox.addEventListener('change', () => completeTasks(task.id))
        if(task.completed){
            li.classList.add('completed')
            span.textContent += `|| (✅Task Completed)`
            span.style.color = 'green'
        }

        const editBtn = document.createElement('button');
        editBtn.textContent = 'EDIT';
        editBtn.addEventListener('click', () => edit(task.id))





        li.append(span, deleteBtn, editBtn, checkbox)
        fragment.append(li)
    })
    taskList.append(fragment)
    const totalTasks = document.getElementById('totalTasks');
    totalTasks.innerHTML = `Total tasks: ${tasks.length}`

    const completedTasks = document.getElementById('completedTasks');
    const completeTasksCounter = tasks.reduce((acc, curr)=> {
        return acc + (curr.completed ? 1 : 0)
    },0)
    completedTasks.textContent = `Completed Tasks: ${completeTasksCounter}`

    const remainingTasks = document.getElementById('remainingTasks');
    remainingTasks.textContent = `Remaining Tasks : ${tasks.length - completeTasksCounter}`

    const completionRate = document.getElementById('completionRate');
    completionRate.textContent = `Completion Rate: ${((completeTasksCounter/tasks.length)*100).toFixed(2)}%`
    
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

function save (){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
    const alphabeticFilter = document.getElementById('alphabeticFilter')
    const dateFilter = document.getElementById('dateFilter');
    const completedStatus = document.getElementById('completedStatus')
        const titleFilter = document.getElementById('titleFilter');
function getProcessedData(){
    let processedTasks = [...tasks]
    
    const priorityFilter = document.getElementById('priorityFilter')
    const priorityFilterInput = priorityFilter.value;
    if(priorityFilterInput !== 'ALL'){
        console.log(priorityFilterInput)
        processedTasks = processedTasks.filter(task=> task.priority === priorityFilterInput)
    } 


    const alphabeticFilterInput = alphabeticFilter.value;
    if (alphabeticFilterInput === 'A-Z'){
        processedTasks = processedTasks.sort((a,b)=>{
            return a.title.localeCompare(b.title)
        })
    }else if (alphabeticFilterInput === 'Z-A'){
        processedTasks = processedTasks.sort((a,b)=>{
            return b.title.localeCompare(a.title)
        })
    }

    const dateFilterInput = dateFilter.value;
    if (dateFilterInput === 'ascending'){
        processedTasks = processedTasks.sort((a,b)=> {
            return a.createdAt - b.createdAt
        })
    } else if (dateFilterInput === 'descending'){
        processedTasks = processedTasks.sort((a,b)=>{
            return b.createdAt - a.createdAt
        })
    }

    const completedStatusInput = completedStatus.value;
    if (completedStatusInput === 'completed'){
        processedTasks = processedTasks.filter(task => task.completed )
    } else if (completedStatusInput === 'active'){
        processedTasks = processedTasks.filter(task => task.completed)
    }

    const titleFilterInput = titleFilter.value.trim().toLowerCase();

    if(titleFilterInput){
        processedTasks = processedTasks.filter(task=> task.title.includes(titleFilterInput.toLowerCase().trim()));
    }

   


    renderUI(processedTasks)
}
addBtn.addEventListener('click', addTasks)
renderUI(tasks)
priorityFilter.addEventListener('change', getProcessedData)
alphabeticFilter.addEventListener('change', getProcessedData)
dateFilter.addEventListener('change', getProcessedData)
completedStatus.addEventListener('change', getProcessedData)
titleFilter.addEventListener('input', getProcessedData)