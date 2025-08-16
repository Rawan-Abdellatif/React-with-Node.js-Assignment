// TodoList: Component to render a list of todos
import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  return (
    // Unordered list to hold todo items
    <ul>
      {todos.map((todo) => (
        // Render a TodoItem for each todo
        <TodoItem
          key={todo.id}       // Unique key for React rendering
          todo={todo}         // Pass todo data to TodoItem
          onToggle={onToggle} // Pass toggle handler
          onDelete={onDelete} // Pass delete handler
          onEdit={onEdit}     // Pass edit handler
        />
      ))}
    </ul>
  );
}

// Export the component
export default TodoList;
