import { ITodo } from "./Atoms";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { todosAtom } from "./Atoms";

const ItemContainer = styled.li`
  width: 100%;
  background-color: ${(props) => props.theme.cardColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 16px;
`;

const TodoItem = ({ text, category, date }: ITodo) => {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name: targetName },
    } = event;
    const targetIndex = todos.findIndex((todo) => todo.date === date);
    const updatedTodo = { text, date, category: targetName as any };
    setTodos((remainTodos) => [
      ...remainTodos.slice(0, targetIndex),
      updatedTodo,
      ...remainTodos.slice(targetIndex + 1),
    ]);
  };
  return (
    <ItemContainer>
      <span>{text}</span>
      <span>{category}</span>
      {category === "TO DO" && (
        <button name="DOING" onClick={onClick}>
          start
        </button>
      )}
      {category === "DOING" && (
        <>
          <button name="TO DO" onClick={onClick}>
            back
          </button>
          <button name="DONE" onClick={onClick}>
            finish
          </button>
        </>
      )}
    </ItemContainer>
  );
};

export default TodoItem;
