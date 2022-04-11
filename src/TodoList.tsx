import React, { useState } from "react";

const TodoList = () => {
  const [todo, setTodo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTodo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(todo);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Write a work to do"
          value={todo}
          onChange={onChange}
        />
        <button>Add</button>
      </form>
    </>
  );
};

export default TodoList;
