// Import useState hook from React
import { useState } from "react";

// Component for a single todo item
function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  // State to track if we are in edit mode
  const [isEditing, setIsEditing] = useState(false);
  // State to store the edited text
  const [newText, setNewText] = useState(todo.text);
  // State to store the edited due date (if any)
  const [dueDate, setDueDate] = useState(todo.dueDate || "");

  // Save changes made to todo
  const handleSave = () => {
    onEdit(todo.id, newText, dueDate); // Call parent function to update todo
    setIsEditing(false); // Exit edit mode
  };

  return (
    // Apply "completed" class if todo is completed
    <li className={todo.completed ? "completed" : ""}>
      {isEditing ? (
        // Render edit form if in edit mode
        <div className="edit-container">
          <div className="edit-inputs">
            <div className="edit-input">
              {/* Input for editing todo text */}
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Edit task"
              />
              {/* Input for editing due date */}
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="edit-actions">
              {/* Save changes button */}
              <button className="save-btn" onClick={handleSave}>Save</button>
              {/* Cancel editing button */}
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      ) : (
        // Render normal todo view if not editing
        <>
          <span
            onClick={() => onToggle(todo.id)} // Toggle completion on click
            className="todo-text"
          >
            {todo.text} 
             {/* Show due date if it exists  */}
            {dueDate && <span className="todo-due">(Due: {dueDate})</span>}
          </span>
          <div className="todo-actions">
            {/* Button to enter edit mode */}
            <button onClick={() => setIsEditing(true)}>Edit</button>
            {/* Button to delete the todo */}
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
}

// Export the component to use in other files
export default TodoItem;
