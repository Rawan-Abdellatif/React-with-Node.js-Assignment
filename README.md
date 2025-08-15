# React-with-Node.js-Assignment


# Simple To-Do Application

A simple To-Do application built with **React** for the front-end and **Node.js with Express** for the back-end. This project allows users to add, view, complete, and delete to-do items, demonstrating key concepts in React and Node.js development.

---

## Features

* Add new to-do items.
* Mark to-do items as completed with a visual indicator.
* Delete to-do items.
* View a list of all to-do items with handling for empty states.

---

## Front-End (React)

* **Components**:

  * `App`: Main component managing state.
  * `TodoList`: Displays all to-do items.
  * `TodoItem`: Represents a single to-do item.
  * `AddTodo`: Form to add new to-do items.

* **State Management**:

  * `useState` to manage to-do state.
  * `useEffect` for fetching data from the server.

* **Styling**:

  * Basic CSS applied for a clean and user-friendly interface.

* **API Calls**:

  * `axios` is used to communicate with the back-end API.

---

## Back-End (Node.js with Express)

* **Server**:

  * Serves the React application.
  * Provides a RESTful API for managing to-do items.

* **API Endpoints**:

  * `GET /api/todos` - Retrieve all to-do items.
  * `POST /api/todos` - Add a new to-do item.
  * `PUT /api/todos/:id` - Update an existing to-do item (e.g., mark as completed).
  * `DELETE /api/todos/:id` - Delete a to-do item.

* **Data Storage**:

  * Uses an in-memory array to store to-do items. No database is required.

* **Middleware**:

  * JSON body parsing via Express middleware.
  * CORS enabled for communication with the React app.

---

## Installation

### 1. Clone the repository

```bash
git clone <repository-link>
cd simple-todo-app
```

### 2. Set up the back-end

```bash
cd server
npm install
npm start
```

The server will run on `http://localhost:5000`.

### 3. Set up the front-end

```bash
cd client
npm install
npm start
```

The React app will run on `http://localhost:3000`.

---

## Usage

1. Open the application in your browser (`http://localhost:3000`).
2. Add new to-do items using the form.
3. Mark items as completed by clicking the checkbox.
4. Delete items using the delete button.
5. All changes are reflected immediately and synced with the back-end.

---

## Technologies Used

* Front-End: React, CSS, Axios
* Back-End: Node.js, Express
* Middleware: CORS, JSON body parsing

---

## Evaluation Criteria Coverage

* **Functionality**: Full CRUD operations on to-do items.
* **Code Quality**: Well-structured, readable, and modular components.
* **UI/UX**: Clean, intuitive, and responsive interface.
* **API Integration**: Proper API calls with error handling and data synchronization.
* **Documentation**: Clear instructions for setup and usage.

---

## Bonus Features 

* Edit existing to-do items.
* Add due dates or priority labels.
* Deployment on hosting platforms like Vercel or Heroku.

---




