import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Todo from "./components/Todo/Todo";
import Nav from "./components/Nav/Nav";
import CreateTodo from "./components/CreateTodo/CreateTodo";
import EditTodo from "./components/EditTodo/EditTodo";
import "./App.css";

function App() {
  console.log(process.env);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/create-todo" element={<CreateTodo />} />
        <Route path="/edit/:id/todo" element={<EditTodo />} />
      </Routes>
    </Router>
  );
}

export default App;
