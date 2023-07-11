import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function EditTodo() {
  const { id } = useParams();

  const [todo, setTodo] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    handleFetchDataById();
  }, []);

  async function handleFetchDataById() {
    try {
      const url =
        process.env.NODE_ENV === "production"
          ? `https://todo-backend-in-class-demo.onrender.com/todo/get-item-by-id/${id}`
          : `http://localhost:3001/todo/get-item-by-id/${id}`;

      let result = await axios.get(url);

      //   console.log(result);
      //   console.log(result.data);
      //   console.log(result.data.data);

      const { todo, done } = result.data.data;

      setTodo(todo);
      setIsDone(done);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      const url =
        process.env.NODE_ENV === "production"
          ? `https://todo-backend-in-class-demo.onrender.com/todo/update-todo-by-id/${id}`
          : `http://localhost:3001/todo/update-todo-by-id/${id}`;

      let result = await axios.put(url, {
        todo,
        done: isDone,
      });

      alert("Updated!");
      const { todo: newTodo, done: newIsDone } = result.data.data;

      setTodo(newTodo);
      setIsDone(newIsDone);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      EditTodo
      <form onSubmit={handleOnSubmit}>
        <label>Todo</label>
        <br />
        <input
          value={todo}
          type="text"
          onChange={(e) => setTodo(e.target.value)}
        />

        <br />

        <label>Done</label>
        <input
          type="checkbox"
          checked={isDone}
          onChange={(e) => setIsDone(!isDone)}
        />

        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default EditTodo;
