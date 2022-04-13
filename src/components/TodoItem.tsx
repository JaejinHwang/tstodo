import { Categories, ITodo } from "./Atoms";
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

const CloseButton = styled.button`
  background: ${(props) => props.theme.cardColor};
  border: 1px solid ${(props) => props.theme.subTextColor};
  color: ${(props) => props.theme.textColor};
  width: 24px;
  height: 24px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
`;

const ActiveButton = styled.button`
  background: ${(props) => props.theme.accentColor};
  border: 1px solid ${(props) => props.theme.subTextColor};
  color: ${(props) => props.theme.textColor};
  width: 24px;
  height: 24px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
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
  const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { parentElement },
    } = event;
    const targetIndex = todos.findIndex(
      (todo) => todo.text === parentElement?.children[0].innerHTML
    );
    setTodos([...todos.slice(0, targetIndex), ...todos.slice(targetIndex + 1)]);
  };
  return (
    <ItemContainer>
      <span>{text}</span>
      <span>{category}</span>
      {category === Categories.TODO && (
        <ActiveButton name="DOING" onClick={onClick}>
          <i className="ri-play-fill"></i>
        </ActiveButton>
      )}
      {category === Categories.DOING && (
        <>
          <ActiveButton name="TODO" onClick={onClick}>
            back
          </ActiveButton>
          <ActiveButton name="DONE" onClick={onClick}>
            finish
          </ActiveButton>
        </>
      )}
      <CloseButton onClick={onDelete}>
        <i className="ri-close-line"></i>
      </CloseButton>
    </ItemContainer>
  );
};

export default TodoItem;
