import { useState } from "react";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [dueDate, setDueDate] = useState(todo.dueDate || "");

  const handleSave = () => {
    onEdit(todo.id, newText, dueDate);
    setIsEditing(false);
  };

  return (
    <li className={todo.completed ? "completed" : ""}>
      {isEditing ? (
        <div className="edit-container">
          <div className="edit-inputs">
            <div className="edit-input">
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Edit task"
              />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="edit-actions">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="todo-view" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Checkbox to toggle completion */}
          <input
  type="checkbox"
  checked={todo.completed}
  onChange={() => onToggle(todo.id)} // Calls the updated toggleTodo
/>
<span
  style={{
    textDecoration: todo.completed ? "line-through" : "none",
    color: todo.completed ? "gray" : "black"
  }}
>
  {todo.text} {todo.dueDate && <span>(Due: {todo.dueDate})</span>}
</span>

          <div className="todo-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
