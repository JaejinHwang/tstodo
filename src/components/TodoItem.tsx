import { Categories, customCategoryAtom, ITodo } from "./Atoms";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { todosAtom } from "./Atoms";
import TodoItemTag from "../TodoItemTag";

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

const PositiveButton = styled.button`
  background: ${(props) => props.theme.positiveColor};
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

const NegativeButton = styled.button`
  background: ${(props) => props.theme.negativeColor};
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

const AccentButton = styled.button`
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

const TextGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const Text = styled.div`
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TodoItem = ({ text, category, date, custom }: ITodo) => {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const [customCategory, setCustomCategory] =
    useRecoilState(customCategoryAtom);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name: targetName },
    } = event;
    const targetIndex = todos.findIndex((todo) => todo.date === date);
    const updatedTodo = { text, date, category: targetName as any, custom };
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
      (todo) =>
        todo.text ===
        parentElement?.parentElement?.children[0].children[0].innerHTML
    );
    console.log(todos[targetIndex].custom);
    const targetCustom = todos[targetIndex].custom;
    const f = todos.filter((todo) => todo.custom === targetCustom).length;
    if (targetCustom !== undefined && f === 1) {
      setCustomCategory(customCategory.filter((item) => item !== targetCustom));
    }
    setTodos([...todos.slice(0, targetIndex), ...todos.slice(targetIndex + 1)]);
  };
  return (
    <ItemContainer>
      <TextGroup>
        <Text>{text}</Text>
        <TodoItemTag category={category} custom={custom} />
      </TextGroup>
      <ButtonGroup>
        {category === Categories.TODO && (
          <AccentButton name="DOING" onClick={onClick}>
            <i className="ri-play-fill"></i>
          </AccentButton>
        )}
        {category === Categories.DOING && (
          <>
            <NegativeButton name="TODO" onClick={onClick}>
              <i className="ri-pause-fill"></i>
            </NegativeButton>
            <PositiveButton name="DONE" onClick={onClick}>
              <i className="ri-stop-fill"></i>
            </PositiveButton>
          </>
        )}
        <CloseButton onClick={onDelete}>
          <i className="ri-close-line"></i>
        </CloseButton>
      </ButtonGroup>
    </ItemContainer>
  );
};

export default TodoItem;
