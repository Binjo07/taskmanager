import { getTasks, addTasktoStore, updateTaskInStore, deleteTaskFromStore, toggleComplete, isDuplicate, getTasksByTitle
 } from "./taskStore.js"
 import { applyFilterAndSort } from "./filterService.js"
 import { renderUI } from "./renderer.js"
 import { taskTitle, taskDesc, prioritySelect, addBtn, taskList, alphabeticFilter
    , dateFilter, completedStatus, titleFilter, priorityFilter
  } from "./dom.js"



let editingId = null

function validateInput(){
    const taskInput = taskTitle.value.trim()
    const descInput = taskDesc.value.trim();
    const priorityInput = prioritySelect.value
    
    if (!taskInput || descInput.length > 50 || !priorityInput ){
        alert('Please enter all fields correctly')
        return false
    }
    return true

}
function clearForm(){
    taskTitle.value = '';
    taskDesc.value = ''; 
}
function getProcessedData(){

    const filters = {
        priority : priorityFilter.value,
        alpha : alphabeticFilter.value,
        date : dateFilter.value,
        status : completedStatus.value,
        title : titleFilter.value.trim().toLowerCase()
    }

    const processedData = applyFiltersAndSort(getTasks(), filters)

    renderUI(processedData)
}
function edit(id){
    const tasks = getTasks()
    const taskToFind = tasks.find(task=> task.id === id)
    if(!taskToFind) return
    taskTitle.value = taskToFind.title;
    taskDesc.value = taskToFind.desc;
    prioritySelect.value = taskToFind.priority
    editingId = id
    addBtn.textContent = 'SAVE'
    taskTitle.focus()

    
}
function addTask() {
    const title = taskTitle.value.trim()
    const desc = taskDesc.value.trim()
    const priority = prioritySelect.value
    if (!validateInput()) return
    if (editingId === null){
        if (isDuplicate(title)){
            const existing = getTasks(title)
            if (!confirm(`Task ${existing.title} already exists. Add anyway?`)){
                return
            }
        }
        addTasktoStore({title, desc, priority})
    }else{
        updateTaskInStore(editingId, {title, desc, priority})
        editingId = null
        addBtn.textContent = 'ADD TASK'
        }
        clearForm()
    renderUI(getTasks())
    }

addBtn.addEventListener('click', addTask)
taskList.addEventListener('click', (event) => {
    const li = event.target.closest('li')
    if (!li) return
    const taskId = li.dataset.taskId
    const target = event.target
    if(target.matches('button')){
        if(target.textContent === 'DELETE'){
            deleteTaskFromStore(taskId)
        } else if (target.textContent === 'EDIT'){
            edit(taskId)
        }
    } else if (target.type === 'checkbox'){
        toggleComplete(taskId)
        renderUI(getTasks())
    }
    renderUI(getTasks())
})

priorityFilter.addEventListener('change', getProcessedData)
alphabeticFilter.addEventListener('change', getProcessedData)
dateFilter.addEventListener('change', getProcessedData)
completedStatus.addEventListener('change', getProcessedData)
titleFilter.addEventListener('input', getProcessedData)

renderUI(getTasks())
  console.log('app.js loaded successfully')