// Fetch existing todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    return todosJSON ? JSON.parse(todosJSON) : []
}

// Save todos to localStorage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Render application todos based on filters
const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

    filteredTodos.forEach((todo) => {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

// remove a todo
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
    todos.splice(todoIndex, 1) }
}

// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('div')
    const textEl = document.createElement('span')
    const checkbox = document.createElement('input')
    const removeButton = document.createElement('button')

    // setup completed todo checkbox
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;

    checkbox.addEventListener('change', (e) => {
        todo.completed = checkbox.checked;
        saveTodos(todos);
        renderTodos(todos, filters);
    })

    todoEl.appendChild(checkbox)

    //add the todo text!
    textEl.textContent = todo.text
    todoEl.appendChild(textEl)

    //setup a button to the right of the text to remove todo
    removeButton.textContent = 'Remove';
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', (e) => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    
    // Check finished todos

    return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}