import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Todo() {
  const navigate = useNavigate();
  const [todoArray, setTodoArray] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const url =
        process.env.NODE_ENV === "production"
          ? `https://todo-backend-in-class-demo.onrender.com/todo`
          : `http://localhost:3001/todo`;

      let result = await axios.get(url);

      setTodoArray(result.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDeleteById(id) {
    try {
      const url =
        process.env.NODE_ENV === "production"
          ? `https://todo-backend-in-class-demo.onrender.com/todo/delete-todo-by-id/${id}`
          : `http://localhost:3001/todo/delete-todo-by-id/${id}`;

      let result = await axios.delete(url);

      const deletedItem = result.data.data;

      let newFilteredArray = todoArray.filter(
        (item) => item.id !== deletedItem.id
      );

      setTodoArray(newFilteredArray);
    } catch (e) {
      console.log(e);
    }
  }

  function handleEdit(id) {
    navigate(`/edit/${id}/todo`);
  }

  return (
    <div className="App">
      {todoArray.map((item) => {
        return (
          <div key={item.id}>
            {item.todo}{" "}
            <button onClick={() => handleEdit(item.id)}>Edit</button>
            <button onClick={() => handleDeleteById(item.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default Todo;
