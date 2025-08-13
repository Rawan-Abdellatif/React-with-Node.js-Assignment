// client/src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/todos")
      .then((res) => setTodos(res.data))
      .catch(console.error);
  }, []);

  const addTodo = (text) => {
    axios.post("http://localhost:5000/api/todos", { text })
      .then((res) => setTodos([...todos, res.data]))
      .catch(console.error);
  };

  const toggleTodo = (id) => {
    axios.put(`http://localhost:5000/api/todos/${id}`)
      .then((res) => setTodos(todos.map(todo => todo.id === id ? res.data : todo)))
      .catch(console.error);
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(console.error);
  };

  return (
    <div className="App">
      {/* Logo  */}
      {/* <img 
        src="/logo192.png" 
        alt="App Logo" 
        style={{ width: "60px", margin: "10px auto", display: "block" }} 
      /> */}

      {/* Title */}
      <h1>Simple To-Do App</h1>
      <h2 style={{ color: "#555", marginBottom: "1rem" }}>
       
      </h2>

      {/* Add Task Section */}
      <AddTodo onAdd={addTodo} />

      {/* Todo List */}
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />

      {/* Footer */}
       <footer style={{ marginTop: "2rem", textAlign: "center", color: "gray", fontStyle: "italic" }}>
        © {new Date().getFullYear()} Created by Rawan Abdellatif
      </footer>
    </div>
  );
}

export default App;
