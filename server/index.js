const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");


// Make public folder accessible in browser
app.use(express.static('public'));


// Middleware
app.use(cors());
app.use(express.json());




// In-memory data store
let todos = [];
let currentId = 1;

// Routes
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });
  
  const newTodo = { id: currentId++, text, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  todo.completed = !todo.completed;
  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.status(204).end();
});

// Serve React build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}






app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
