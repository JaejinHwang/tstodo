import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0px;
`;

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
}

const TodoList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
  };
  console.log(errors);
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Email"
          {...register("email", {
            required: "Email Required",
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: "Email pattern invalid",
            },
          })}
        />
        {errors?.email?.message}
        <input placeholder="First Name" {...register("firstName")} />
        <input placeholder="Last Name" {...register("lastName")} />
        <input placeholder="Password" {...register("password")} />
        <input
          placeholder="Password Confirm"
          {...register("passwordConfirm")}
        />
        <button>Add</button>
      </Form>
    </>
  );
};

export default TodoList;
