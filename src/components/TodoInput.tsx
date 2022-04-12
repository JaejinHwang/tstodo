import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { todosAtom } from "./Atoms";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0px;
`;

interface IForm {
  toDo: string;
}

const TodoInput = () => {
  const setTodos = useSetRecoilState(todosAtom);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    setTodos((remainTodos) => [
      { text: toDo, date: Date.now(), category: "TO DO" },
      ...remainTodos,
    ]);
    setValue("toDo", "");
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Input things to do"
        {...register("toDo", {
          required: "Content required",
        })}
      />
      {errors?.toDo?.message}
      <button>Add</button>
    </Form>
  );
};

export default TodoInput;
