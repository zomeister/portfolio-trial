import { useState } from "react"

function TodoItem ({todo, removeTodo, completeTodo}) {
    return (
      <div className='todo-item'>
        <p>{todo}</p>
        <button onClick={()=>completeTodo(todo.id)}>Complete</button>
        <button onClick={()=>removeTodo(todo.id)}>Delete</button>
      </div>
    )
}
function TodoDisplay({ todos, onRemoveTodo, onCompleteTodo }) {
    return (
      <ul>
        {todos.map((todo, index) => (
            <li key={index}>
              <TodoItem
                todo={todo}
                removeTodo={()=>{onRemoveTodo(index)}}
                completeTodo={()=>{onCompleteTodo(index)}}
              />
            </li>
        ))}
      </ul>
    )
}
  function CompletedTodoDisplay({ completedTodos, onRemoveCompleted }) {
    return (
      <ul>
        {completedTodos.map((todo, index) => (
            <li key={index}>
              {todo}
              <button onClick={()=>{onRemoveCompleted(index)}}>Delete</button>
            </li>
        ))}
      </ul>
    )
}

function TodoList () {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')
    const [completeTodos, setCompleteTodos] = useState([])
  
    const addTodo = event => {
      event.preventDefault() // prevent page refresh
      setTodos([...todos, input]) // add new todo to todos array
      setInput('') // clear input after form submission
    }
  
    const removeTodo = index => {
      const newTodos = todos.filter((_, i) => i!== index)
      setTodos(newTodos)
    }
  
    const completeTodo = index => {
      const newCompleteTodos = [...completeTodos, todos[index]]
      setCompleteTodos(newCompleteTodos)
      const newTodos = todos.filter((_, i) => i!== index)
      setTodos(newTodos)
    }
  
    const removeCompleted = index => {
      const newCompleteTodos = completeTodos.filter((_, i) => i!== index)
      setCompleteTodos(newCompleteTodos)
    }
    return (
      <div className='todo-app'>
        <h1>Todo</h1>
        <form>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={addTodo}>Add Todo</button>
        </form>
        <TodoDisplay todos={todos} onRemoveTodo={removeTodo} onCompleteTodo={completeTodo}/>
        <h2>Completed</h2>
        <CompletedTodoDisplay completedTodos={completeTodos} onRemoveCompleted={removeCompleted}/>
      </div>
    )
}
  
  export default TodoList