// Copyright (C) 2022 TANNER AG

import React, { FormEvent, useEffect, useState } from "react";

type Todo = {
  id: number;
  content: string;
  checked: boolean;
};

type Props = {
  enableNotifications?: boolean;
  hide?: boolean;
};

const ToDoList: React.FC<Props> = ({ enableNotifications, hide }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo = String(new FormData(event.currentTarget).get("name"));
    let todoList = [...todos];
    todoList.push({
      id: Date.now(),
      content: String(newTodo),
      checked: false,
    });

    setTodos(todoList);

    event.currentTarget.reset();
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id != id));
  };

  const handleCheck = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return { ...todo, checked: !todo.checked };
      })
    );
  };

  useEffect(() => {
    if (!hide) {
      if (
        enableNotifications &&
        todos.length > 0 &&
        todos.every((todo) => todo.checked)
      ) {
        alert(`All ${todos.length} ToDos completed`);
      }
    }
  }, [enableNotifications, hide, todos]);
  return (
    <>
      <form onSubmit={handleAdd}>
        <input name="name" placeholder="Add ToDo" autoComplete="off" />
        <button type="submit">Add</button>
      </form>
      <div>
        <ol>
          {todos.map((todo, index) => (
            <li key={index}>
              <input
                id={`${todo.id}`}
                checked={todo.checked}
                onChange={() => handleCheck(todo.id)}
                type="checkbox"
              />
              <label htmlFor={`${todo.id}`}>{todo.content}</label>
              <button onClick={() => handleDelete(todo.id)} title="Delete ToDo">
                x
              </button>
            </li>
          ))}
        </ol>
        {todos.length > 0 || <p>The ToDo list is empty</p>}
      </div>
    </>
  );
};

export default ToDoList;
