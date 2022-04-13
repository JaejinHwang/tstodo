import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  Categories,
  categoryAtom,
  customCategoryAtom,
  todosAtom,
} from "./Atoms";
import { useDidMountEffect } from "./Hooks";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0px;
`;

interface IForm {
  toDo: string;
  category: string;
}

const TodoInput = () => {
  const [category, setCategory] = useRecoilState(categoryAtom);
  const customCategory = useRecoilValue(customCategoryAtom);
  const [todos, setTodos] = useRecoilState(todosAtom);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    setTodos((remainTodos) => [
      { text: toDo, date: Date.now(), category: Categories.TODO },
      ...remainTodos,
    ]);
    setValue("toDo", "");
  };
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const { currentTarget } = event;
    setCategory(currentTarget.value as any);
  };
  useDidMountEffect(() => {
    localStorage.setItem("todoStorage", JSON.stringify(todos));
  }, [todos]);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Input things to do"
        {...register("toDo", {
          required: "Content required",
        })}
      />
      {errors?.toDo?.message}
      <select value={category} onInput={onInput}>
        <option value={Categories.TODO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <input list="datalist" placeholder="Custom Category" />
      <datalist id="datalist">
        {customCategory.map((category) => (
          <option value={category} />
        ))}
      </datalist>
      <button>Add</button>
    </Form>
  );
};

export default TodoInput;
