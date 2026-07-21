import { taskList, totalTasks, completedTasks, remainingTasks, completionRate } from "./dom.js"
export function calculateStats(array){
    const total = array.length
    const completed = array.reduce((acc, curr)=>{
       return acc + (curr.completed ? 1 : 0)
    }, 0)
   
    const remaining = total - completed
    const rate = ((completed/total)*100).toFixed(2)

    return {total, completed, remaining, rate}
}

export function renderUI (array){
    const fragment = document.createDocumentFragment()
    taskList.innerHTML = ''
    array.forEach((task)=>{
        const li = document.createElement('li');
        const span = document.createElement('span')
        li.dataset.taskId = task.id
        span.textContent = `Task : ${task.title} || Description: ${task.desc} || Priority: ${task.priority}`

        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'DELETE'
        const checkbox = document.createElement('input')
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
        document.getElementById('completionRate').textContent = stats.total === 0 ? 0 : `Completion Rate :${stats.rate}%`

        li.append(span, deleteBtn, editBtn, checkbox)
        fragment.append(li)
    })
    taskList.append(fragment)
}  console.log('renderer.js loaded successfully')