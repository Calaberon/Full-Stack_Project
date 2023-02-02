const getTasks = async () => {
    const response = await fetch(`${API_URL}/tasks`)
    const data = await response.json()
    return data
}

const addTask = async (realmID, description) => {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            "realmID": `${realmID}`,
            "taskname": `${description}`
        })
    }

    const response = await fetch(`${API_URL}/tasks`, options)
    const data = await response.json()
    if (data.validation) {
        createTodoList()
    }
}

const deleteTask = async (taskID) => {
    const options = {
        method: 'DELETE',
    }

    const response = await fetch(`${API_URL}/tasks/${taskID}`, options)
    const data = await response.json()
    if (data.validation) {
        createTodoList()
    }
}

const updateTask = async (taskID, description) => {
    const options = {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            "taskname": `${description}`
        })
    }

    await fetch(`${API_URL}/tasks/${taskID}`, options)
}

const setRealmText = (id) => {
    const realmObj = {
        1: 'Home',
        2: "Work",
        3: "Gym",
        4: "Leisure"
    } 
    return realmObj[id]
}

const setRealmColor = (id) => {
    const colorObj = {
        1: 'Red',
        2: "Orange",
        3: "Purple",
        4: "Pink"
    } 
    return colorObj[id]
}

const createTodoList = async () => {
    const data = await getTasks()
    const tasksContainer = document.getElementById('tasks')
    tasksContainer.innerHTML = ''

    for (obj of data) {
        const taskItemContainer = document.createElement('div')
        taskItemContainer.setAttribute('id', `${obj.id}`)
        taskItemContainer.classList.add('task-item-container')
        tasksContainer.appendChild(taskItemContainer)
        
        const taskItemRealm = document.createElement('div')
        taskItemRealm.classList.add('task-item-realm')
        taskItemRealm.innerText = setRealmText(obj.realm_id)
        taskItemRealm.style.backgroundColor = setRealmColor(obj.realm_id)
        taskItemContainer.appendChild(taskItemRealm)
        
        const taskItemName = document.createElement('div')
        taskItemName.classList.add('task-item-name')
        taskItemName.innerText = obj.taskname
        taskItemName.setAttribute('contentEditable', 'true')
        taskItemName.addEventListener('input', (e) => {
            updateTask(e.currentTarget.parentElement.id, e.currentTarget.innerText)
        })
        taskItemContainer.appendChild(taskItemName)

        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete-btn')
        deleteBtn.innerText = 'Delete'
        deleteBtn.addEventListener('click', (e) => {
            deleteTask(e.currentTarget.parentElement.id)
        })
        taskItemContainer.appendChild(deleteBtn)
    }
}

const API_URL = '';

createTodoList()

const form = document.querySelector("#new-task-form");
const input = document.querySelector ("#new-task-input");
const listEl = document.querySelector("#tasks");
const addNewTaskBtn = document.querySelector('#new-task-submit')

addNewTaskBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const realmSelect = document.getElementById('todo-realm')
    const taskInput = document.getElementById('new-task-input')
    addTask(realmSelect.value, taskInput.value)
}) 