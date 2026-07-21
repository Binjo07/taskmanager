let tasks = []

function loadTasks (){
    tasks = JSON.parse(localStorage.getItem('tasks')) || []
}

 export function saveTasks (){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

export function getTasks (){
    return [...tasks]
}

export function isDuplicate (title){
    return tasks.some(task=> task.title.toLowerCase() === title.toLowerCase())
}

export function addTasktoStore({title, desc, priority}){
    const newTask = ({
        id: crypto.randomUUID(),
        title : title.trim(),
        desc: desc.trim(),
        priority : priority,
        completed: false,
        createdAt: Date.now()
    })

    tasks.push(newTask)
    return newTask
}

export function updateTaskInStore(id, {title, desc, priority}){
    tasks = tasks.map(task => {
        if (task.id === id){
            return {...task, title, desc, priority}
        }
        return task
    })
    saveTasks()
}
export function getTasksByTitle(title){
    return tasks.find(tasks => task.title.toLowerCase() === title.toLowerCase())
}

export function deleteTaskFromStore (id){
    tasks = tasks.filter(task=> task.id !== id)
    saveTasks()

}

export function toggleComplete(id){
    tasks = tasks.map(task=>{
        if (task.id === id){
            return {...task, completed: !task.completed}
        }
        return task
    })
    saveTasks()
}

loadTasks()
  console.log('task.js loaded successfully', getTasks())