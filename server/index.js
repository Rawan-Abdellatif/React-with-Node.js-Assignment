// Import required libraries
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000; // Use dynamic port for deployment

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// In-memory data store for todos
let todos = [];
let currentId = 1;

// ----------------- API ROUTES -----------------

// Get all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post("/api/todos", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  const newTodo = { id: currentId++, text, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo
app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { text, dueDate, completed } = req.body;

  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  if (typeof text === "string") todo.text = text.trim();
  if (dueDate !== undefined) todo.dueDate = dueDate;
  if (typeof completed === "boolean") todo.completed = completed;

  res.json(todo);
});

// Delete a todo
app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.status(204).end();
});

// ----------------- SERVE REACT FRONTEND -----------------
const buildPath = path.join(__dirname, "../client/build");

if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));

  // Serve index.html for any other route (for React Router)
  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
} else {
  console.warn("React build folder not found. Front-end not served.");
}

// ----------------- START SERVER -----------------
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
