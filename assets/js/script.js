const tasks = [
  { id: 1, task: "Lavar la ropa", finished: false },
  { id: 2, task: "Organizar el jardín", finished: true },
  { id: 3, task: "Visitar a Vicente", finished: false },
  { id: 4, task: "Organizar el cumpleaños de Pedro", finished: false },
]

const newTaskInput = document.getElementById("new-task")
const newTaskButton = document.getElementById("add-task-button")
const taskListDiv = document.querySelector(".task-list")
const taskCountSpan = document.querySelector(".task-count .value")
const finishedCountSpan = document.querySelector(".finished-count .value")

const getNewId = () => tasks.reduce((acc, { id }) => (id > acc ? id : acc), 0) + 1

const addTask = () => {
  tasks.push({ id: getNewId(), task: newTaskInput.value, finished: false })
  renderTasks()
}

const completeTask = (taskId) => {
  const index = tasks.findIndex(({ id }) => id === taskId)
  const { id, task } = tasks[index]
  tasks[index] = { ...tasks[index], finished: true }
  renderTasks()
  alert(`Se completó la tarea ${id}:\n > ${task}`)
}

const deleteTask = (taskId) => {
  const { id, task } = tasks.splice(
    tasks.findIndex(({ id }) => id === taskId),
    1
  )[0]
  renderTasks()
  alert(`Se borró la tarea ${id}:\n > ${task}`)
}

const countTasks = () => {
  taskCountSpan.innerText = tasks.length
  finishedCountSpan.innerText = tasks.filter((t) => t.finished).length
}

const actionButtons = [
  { title: "Completar", className: "check fas fa-thumbs-up", onClick: completeTask },
  { title: "Eliminar", className: "del fas fa-trash", onClick: deleteTask },
]

const renderTasks = () => {
  countTasks()
  taskListDiv.innerHTML = "<div><h4>ID</h4><h4>Tarea</h4></div>"
  tasks.forEach(({ id, task, finished }) => {
    const newTask = document.createElement("div")
    newTask.innerHTML = `<p>${id}</p><p class="task-description">${task}</p>`
    if (finished) {
      newTask.innerHTML += ` <i class="fas fa-circle-check" title="Completado"></i>`
      newTask.classList.add("finished")
    } else {
      actionButtons.forEach(({ title, className, onClick }) => {
        const button = document.createElement("i")
        button.className = className
        button.addEventListener("click", () => onClick(id))
        button.title = title
        newTask.appendChild(button)
      })
    }
    taskListDiv.appendChild(newTask)
  })
}

newTaskButton.addEventListener("click", addTask)
renderTasks()
