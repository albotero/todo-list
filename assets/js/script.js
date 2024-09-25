// Initial data
const tasks = [
  { id: 1, task: "Lavar la ropa", finished: false },
  { id: 2, task: "Organizar el jardín", finished: true },
  { id: 3, task: "Visitar a Vicente", finished: false },
  { id: 4, task: "Organizar el cumpleaños de Pedro", finished: false },
]

// DOM Elements to be modified by script
const DOM = {
  newTaskInput: document.getElementById("new-task"),
  addTaskButton: document.getElementById("add-task-button"),
  taskListDiv: document.querySelector(".task-list"),
  taskCountSpan: document.querySelector(".task-count .value"),
  finishedCountSpan: document.querySelector(".finished-count .value"),
  modify: (element, props) => Object.assign(element, props),
  create: (tag, props) => DOM.modify(document.createElement(tag), props),
}

// Tasks functions
const Task = {
  // Get next Id for new tasks
  newId: () => tasks.reduce((acc, { id }) => Math.max(acc, id), 0) + 1,
  // Find the index of a task by its Id
  index: (taskId) => tasks.findIndex(({ id }) => id === taskId),
  // Count all or finished tasks
  count: (countUnfinished = true) => tasks.filter((t) => countUnfinished || t.finished).length,
  // Add a new task
  add: () => {
    const task = DOM.newTaskInput.value
    if (!task) {
      alert("¡ERROR!\nDebe escribir alguna tarea para poder agregarla a la lista")
      return
    }
    tasks.push({ id: Task.newId(), task, finished: false })
    // Reset input
    DOM.newTaskInput.value = ""
    renderTasks()
  },
  // Set a task as completed
  check: (taskId) => {
    const index = Task.index(taskId)
    tasks[index] = { ...tasks[index], finished: true }
    renderTasks()
  },
  // Delete a task
  delete: (taskId) => {
    const [{ id, task }] = tasks.splice(Task.index(taskId), 1)
    renderTasks()
    alert(`Se borró la tarea #${id}:\n > ${task}`)
  },
}

// DOM functions

const actionButtons = [
  { title: "Completar", className: "check fas fa-thumbs-up", onclick: Task.check },
  { title: "Eliminar", className: "del fas fa-trash", onclick: Task.delete },
]

const renderTasks = () => {
  // Update counters
  DOM.taskCountSpan.innerText = Task.count()
  DOM.finishedCountSpan.innerText = Task.count(false)
  // Update tasks list
  DOM.taskListDiv.innerHTML = "<div><h4>ID</h4><h4>Tarea</h4></div>"
  tasks.forEach(({ id, task, finished }) => {
    const newTask = DOM.create("div", { innerHTML: `<p>${id}</p><p class="task-description">${task}</p>` })
    if (finished) {
      // Add finished icon
      DOM.modify(newTask, {
        className: "finished",
        innerHTML: `${newTask.innerHTML} <i class="fas fa-circle-check" title="Completado"></i>`,
      })
    } else {
      // Add finish and delete buttons
      actionButtons.forEach((props) =>
        newTask.appendChild(DOM.create("i", { ...props, onclick: () => props.onclick(id) }))
      )
    }
    DOM.taskListDiv.appendChild(newTask)
  })
}

DOM.addTaskButton.addEventListener("click", Task.add)
renderTasks()
