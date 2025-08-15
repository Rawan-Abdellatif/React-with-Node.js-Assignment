// AddTodo: Form to add a new todo item
import { useState } from "react";

function AddTodo({ onAdd }) {
  // State to store input text
  const [text, setText] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (!text.trim()) return; // Do nothing if input is empty
    onAdd(text); // Call parent function to add todo
    setText(""); // Clear input field
  };

  return (
    // Form element with submit handler
    <form onSubmit={handleSubmit}>
      {/* Input for entering new todo */}
      <input
        type="text"
        placeholder=" Please add your task and stay productive "
        value={text} // Bind input value to state
        onChange={(e) => setText(e.target.value)} // Update state on change
      />
      {/* Submit button */}
      <button type="submit">Add</button>
    </form>
  );
}

// Export the component
export default AddTodo;
