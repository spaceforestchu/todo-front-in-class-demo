import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateTodo() {
  const navigate = useNavigate();

  const [todo, setTodo] = useState("");

  async function handleOnSubmit(event) {
    event.preventDefault();

    try {
      const url =
        process.env.NODE_ENV === "production"
          ? "https://todo-backend-in-class-demo.onrender.com/create-todo"
          : "http://localhost:3001/todo/create-todo";

      await axios.post(url, {
        todo,
      });

      setTodo("");

      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <label>Create Todo</label>
      <br />
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button>Submit</button>
    </form>
  );
}

export default CreateTodo;
