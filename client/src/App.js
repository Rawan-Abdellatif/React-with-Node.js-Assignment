// Import React hooks and necessary libraries/components
import { useEffect, useState } from "react";
import axios from "axios";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import "./App.css";
import logo from "./logo.png";

function App() {
  // State to store list of todos
  const [todos, setTodos] = useState([]);

  // Fetch todos from backend when component mounts
  useEffect(() => {
    axios.get("http://localhost:5000/api/todos")
      .then((res) => setTodos(res.data))
      .catch(console.error); // Log errors if any
  }, []);

  // Add a new todo
  const addTodo = (text) => {
    axios.post("http://localhost:5000/api/todos", { text })
      .then((res) => setTodos([...todos, res.data]))
      .catch(console.error);
  };

// Toggle completion status of a todo
const toggleTodo = (id) => {
  // Find the current todo
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  // Send PUT request with updated 'completed' status
  axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !todo.completed })
    .then((res) => 
      setTodos(todos.map(t => t.id === id ? res.data : t)) // update state
    )
    .catch(console.error);
};



  // Delete a todo
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(console.error);
  };

  // Edit a todo's text and due date
  const editTodo = (id, newText, dueDate) => {
    const existing = todos.find(todo => todo.id === id);
    if (!existing) return;

    const oldText = (existing.text || "").trim();
    const newTextTrimmed = (newText || "").trim();

    // Normalize old due date
    let oldDueDateFormatted = "";
    if (existing.dueDate) {
      oldDueDateFormatted = new Date(existing.dueDate).toISOString().split("T")[0];
    }

    // Normalize new due date (keep old if none provided)
    let newDueDateFormatted = "";
    if (dueDate) {
      newDueDateFormatted = new Date(dueDate).toISOString().split("T")[0];
    } else {
      newDueDateFormatted = oldDueDateFormatted;
    }

    const textSame = oldText === newTextTrimmed;
    const dateSame = oldDueDateFormatted === newDueDateFormatted;

    if (textSame && dateSame) {
      alert("There are no changes");
      return;
    }

    // Update todo in backend and state
    axios.put(`http://localhost:5000/api/todos/${id}`, {
      text: newTextTrimmed,
      dueDate: newDueDateFormatted || null
    })
      .then((res) => setTodos(todos.map(todo => todo.id === id ? res.data : todo)))
      .catch(console.error);
  };

  return (
    <>
      <div className="App">
        {/* Logo */}
        <img 
          src={logo}
          alt="App Logo"
          style={{ margin: "10px auto", display: "block", borderRadius:"55%", width: "120px" }}
        />

        {/* App Title */}
        <h1>Simple To-Do App</h1>
        <h2 style={{ color: "#555", marginBottom: "1rem" }}>
          {/* Subtitle can go here */}
        </h2>

        {/* Section to add new task */}
        <AddTodo onAdd={addTodo} />

        {/* List of todos */}
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        {/* Footer */}
        <footer style={{ marginTop: "2rem", textAlign: "center", color: "gray", fontStyle: "italic" }}>
          © {new Date().getFullYear()} Created by Rawan Abdellatif
        </footer>
      </div>
    </>
  );
}

export default App;
