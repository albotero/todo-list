// Initial data
const tasks = [
  { id: 1, task: "Lavar la ropa", finished: false },
  { id: 2, task: "Organizar el jardín", finished: true },
  { id: 3, task: "Visitar a Vicente", finished: false },
  { id: 4, task: "Organizar el cumpleaños de Pedro", finished: false },
]

// DOM Elements to be used by script
const DOM = {
  newTaskInput: document.getElementById("new-task"),
  formTasks: document.querySelector(".form-tasks"),
  taskListDiv: document.querySelector(".task-list"),
  taskCountSpan: document.querySelector(".task-count .value"),
  finishedCountSpan: document.querySelector(".finished-count .value"),
  create: (tag, props) => Object.assign(document.createElement(tag), props),
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
  add: (e) => {
    e.preventDefault()
    tasks.push({
      id: Task.newId(),
      task: new FormData(e.target).get("new-task").trim(),
      finished: false,
    })
    e.target.reset()
    updateDOM()
  },

  // Change finished status
  check: (taskId) => {
    const index = Task.index(taskId)
    tasks[index].finished = !tasks[index].finished
    updateDOM()
  },

  // Delete a task
  delete: (taskId) => {
    const [{ id, task }] = tasks.splice(Task.index(taskId), 1)
    updateDOM()
    alert(`Se borró la tarea #${id}:\n > ${task}`)
  },
}

// DOM functions

const actionButtons = [
  { title: "Completado", className: "check fas fa-circle-check", onclick: Task.check },
  { title: "Completar", className: "check fas fa-thumbs-up", onclick: Task.check },
  { title: "Eliminar", className: "del fas fa-trash", onclick: Task.delete },
]

const renderTask = ({ id, task, finished }) => {
  // Create new DOM Element
  const newTask = DOM.create("div", {
    className: finished ? "finished" : "",
    innerHTML: `<p>${id}</p><p class="task-description">${task}</p>`,
  })
  // Add buttons
  actionButtons
    // Get only required buttons according to completion status
    .slice(...(finished ? [0, 1] : [1]))
    // Append each button to the task Element
    .forEach((p) => newTask.appendChild(DOM.create("i", { ...p, onclick: () => p.onclick(id) })))
  return newTask
}

const updateDOM = () => {
  // Update counters
  DOM.taskCountSpan.innerText = Task.count()
  DOM.finishedCountSpan.innerText = Task.count(false)
  // Update tasks list
  DOM.taskListDiv.innerHTML = "<div><h4>ID</h4><h4>Tarea</h4></div>"
  DOM.taskListDiv.append(...tasks.map(renderTask))
  DOM.newTaskInput.focus()
}

DOM.formTasks.addEventListener("submit", Task.add)
document.addEventListener("DOMContentLoaded", updateDOM)
