export function applyFilterAndSort (tasks, {priority, alpha, date, status, title}){
    let processsedTasks = [...tasks]

    if (priority !== 'ALL'){
        processsedTasks = processsedTasks.filter(task => task.priority === priority)
    }

    if (status === 'completed'){
        processsedTasks = processsedTasks.filter(task=> task.status === status)
    }else if (status === 'active'){
        processsedTasks = processsedTasks.fiilter(task => task.status === status)
    }

    if (alpha === 'A-Z'){
        processsedTasks = processsedTasks.sort((a,b)=>{
            return a.title.localeCompare(b.title)
        })
    } else if (alpha === 'Z-A'){
        processsedTasks = processsedTasks.sort((a,b)=>{
            return b.title.localeCompare(a.title)
        })
    }

    if (date = 'ascending'){
        processsedTasks = processsedTasks.sort((a,b)=>{
            return a.createdAt - b.createdAt
        })
    } else if (date = 'descending'){
        processsedTasks = processsedTasks.sort((a,b)=>{
            return b.createdAt - a.createdAt
        })
    }

    if (title){
        processsedTasks = processsedTasks.filter(task.title.toLowerCase().includes(title))
    }

    return processsedTasks

}

  console.log('filter.js loaded successfully')