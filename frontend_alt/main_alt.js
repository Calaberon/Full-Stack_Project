window.addEventListener('load', () => {
    const taskUrl = 'https://full-stack-deploy-api.onrender.com/tasks';
    
    const postTask = {
        method: 'GET',
        url: taskUrl,
        params: { taskname, body, realm_id },
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const postRequest = fetch('/tasks', postTask)//////////////************************Post request */
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector ("#new-task-input");
    const listEl = document.querySelector("#tasks");

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = input.value;
        if (!task){
            alert("Please enter a task");
            return;
        } 
        const taskEl = document.createElement("div");
        taskEl.classList.add("task");

        const taskContentEl = document.createElement("div");
        taskContentEl.classList.add("content");
        // taskContentEl.innerText = task;

        taskEl.appendChild(taskContentEl);

        const taskInputEl = document.createElement("input");
        taskInputEl.classList.add("text");
        taskInputEl.type = "text";///////////*****************************************this is the type of input */
        taskInputEl.value = task;////////////*****************************************this is the input value */
        postRequest.value = task;
        taskInputEl.setAttribute("readonly", "readonly");
        taskContentEl.appendChild(taskInputEl);

        const taskActionsEl = document.createElement("div");
        taskActionsEl.classList.add("actions");

        const taskEditEl = document.createElement("button");
        taskEditEl.classList.add("edit");
        taskEditEl.innderHTML = "Edit";

        const taskDeleteEl = document.createElement("button");
        taskDeleteEl.classList.add("delete");
        taskDeleteEl.innerHTML = "Delete";

        taskActionsEl.appendChild(taskEditEl);
        taskActionsEl.appendChild(taskDeleteEl);

        taskEl.appendChild(taskActionsEl);
        listEl.appendChild(taskEl);

        input.value = "";

        taskEditEl.addEventListener('click', () => {
            if (taskEditEl.innerText.toLowerCase() == 'edit'){
                taskInputEl.removeAttribute("readonly");
                taskInputEl.focus();
                taskEditEl.innerText = "Save";
            } else {
                taskInputEl.setAttribute("readonly", "readonly");
                taskEditEl.innerText = "Edit";
            }
            
        });

        taskDeleteEl.addEventListener('click', () => {
            listEl.removeChild(taskEl);
        });

        // listEl.appendChild(taskEl);
    })    
})

// window.addEventListener('load', () => {
//     const taskUrl = 'https://full-stack-deploy-api.onrender.com/tasks';
    
//     const getAll = {
//         method: 'GET',
//         url: taskUrl,
//         params: { taskname, body, realm_id }
//     }
//     const form = document.querySelector("#new-task-form");
//     const input = document.querySelector ("#new-task-input");
//     const listEl = document.querySelector("#tasks");

//     form.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const task = input.value;
//         if (!task){
//             alert("Please enter a task");
//             return;
//         } 
//         const taskEl = document.createElement("div");
//         taskEl.classList.add("task");

//         const taskContentEl = document.createElement("div");
//         taskContentEl.classList.add("content");
//         // taskContentEl.innerText = task;

//         taskEl.appendChild(taskContentEl);

//         const taskInputEl = document.createElement("input");
//         taskInputEl.classList.add("text");
//         taskInputEl.type = "text";
//         taskInputEl.value = task;
//         taskInputEl.setAttribute("readonly", "readonly");
//         taskContentEl.appendChild(taskInputEl);

//         const taskActionsEl = document.createElement("div");
//         taskActionsEl.classList.add("actions");

//         const taskEditEl = document.createElement("button");
//         taskEditEl.classList.add("edit");
//         taskEditEl.innderHTML = "Edit";

//         const taskDeleteEl = document.createElement("button");
//         taskDeleteEl.classList.add("delete");
//         taskDeleteEl.innerHTML = "Delete";

//         taskActionsEl.appendChild(taskEditEl);
//         taskActionsEl.appendChild(taskDeleteEl);

//         taskEl.appendChild(taskActionsEl);
//         listEl.appendChild(taskEl);

//         input.value = "";

//         taskEditEl.addEventListener('click', () => {
//             if (taskEditEl.innerText.toLowerCase() == 'edit'){
//                 taskInputEl.removeAttribute("readonly");
//                 taskInputEl.focus();
//                 taskEditEl.innerText = "Save";
//             } else {
//                 taskInputEl.setAttribute("readonly", "readonly");
//                 taskEditEl.innerText = "Edit";
//             }
            
//         });

//         taskDeleteEl.addEventListener('click', () => {
//             listEl.removeChild(taskEl);
//         });

//         // listEl.appendChild(taskEl);
//     })    
// })