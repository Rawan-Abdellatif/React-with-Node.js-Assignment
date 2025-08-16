// Import required libraries
const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const path = require("path"); 

// Make 'public' folder accessible in browser
app.use(express.static('public'));

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Parse JSON request bodies

// In-memory data store for todos
let todos = [];
let currentId = 1; // ID counter for todos

// Routes

// Get all todos
app.get("/api/todos", (req, res) => {
  res.json(todos); // Return todos as JSON
});

// Add a new todo
app.post("/api/todos", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  const newTodo = { id: currentId++, text, completed: false }; // Create new todo
  todos.push(newTodo); // Add to store
  res.status(201).json(newTodo); // Return created todo
});

// Update a todo (text, due date, or completed status)
app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id); // Get ID from URL
  const { text, dueDate, completed } = req.body;
  const todo = todos.find(t => t.id === id); // Find todo by ID
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  // Update text if provided
  if (typeof text === "string") {
    todo.text = text.trim();
  }

  // Update due date if provided
  if (dueDate !== undefined) {
    todo.dueDate = dueDate;
  }

  // Update completed status if provided
  if (typeof completed === "boolean") {
    todo.completed = completed;
  }

  res.json(todo); // Return updated todo
});

// Delete a todo
app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id); // Get ID from URL
  todos = todos.filter(t => t.id !== id); // Remove todo from store
  res.status(204).end(); // Return no content
});

// Serve React build in production


const buildPath = path.join(__dirname, "../client/build");
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
} else {
  console.warn("React build folder not found. Front-end not served.");
}


// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
