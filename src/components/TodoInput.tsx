import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, customCategoryAtom, todosAtom } from "./Atoms";
import { useDidMountEffect } from "./Hooks";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Button = styled.button`
  height: 40px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.textColor};
  border: none;
  font-size: 14px;
  font-weight: 500;
`;

const Select = styled.select`
  height: 40px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  padding-left: 20px;
  padding-right: 20px;
  border: none;
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input`
  height: 40px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  padding-left: 20px;
  padding-right: 20px;
  border: none;
  font-size: 14px;
  font-weight: 500;
`;

interface IForm {
  toDo: string;
  category: string;
  custom: string;
}

const TodoInput = () => {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const [customCategory, setCustomCategory] =
    useRecoilState(customCategoryAtom);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit = ({ toDo, category, custom }: IForm) => {
    custom !== ""
      ? setTodos((remainTodos) => [
          {
            text: toDo,
            date: Date.now(),
            category: category as any,
            custom,
          },
          ...remainTodos,
        ])
      : setTodos((remainTodos) => [
          {
            text: toDo,
            date: Date.now(),
            category: category as any,
          },
          ...remainTodos,
        ]);
    if (custom !== "" && !customCategory.includes(custom)) {
      setCustomCategory((remainCustoms) => [...remainCustoms, custom]);
    }
    setValue("toDo", "");
    setValue("custom", "");
    setValue("category", Categories.TODO);
  };

  useDidMountEffect(() => {
    localStorage.setItem("todoStorage", JSON.stringify(todos));
    localStorage.setItem("customStorage", JSON.stringify(customCategory));
  }, [todos, customCategory]);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="Input things to do"
        {...register("toDo", {
          required: "Content required",
        })}
      />
      {errors?.toDo?.message}
      <Select {...register("category")}>
        <option value={Categories.TODO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </Select>
      <Input
        list="datalist"
        placeholder="Custom Category"
        {...register("custom")}
      />
      <datalist id="datalist">
        {customCategory.map((category, index) => (
          <option key={index} value={category} />
        ))}
      </datalist>
      <Button>Add to List</Button>
    </Form>
  );
};

export default TodoInput;
