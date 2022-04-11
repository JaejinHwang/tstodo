import React, { useState } from "react";
import { useForm } from "react-hook-form";

const TodoList = () => {
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <>
      <form>
        <input placeholder="Email" {...register("email")} />
        <input placeholder="First Name" {...register("firstName")} />
        <input placeholder="Last Name" {...register("lastName")} />
        <input placeholder="Password" {...register("password")} />
        <input
          placeholder="Password Confirm"
          {...register("passwordConfirm")}
        />
        <button>Add</button>
      </form>
    </>
  );
};

export default TodoList;
