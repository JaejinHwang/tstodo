import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { todosAtom } from "./Atoms";
import TodoItem from "./TodoItem";

const ListContainer = styled.ul`
  width: 100%;
  margin: 40px 0px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TodoList = () => {
  const todos = useRecoilValue(todosAtom);
  return (
    <ListContainer>
      {todos.map((todo) => (
        <TodoItem {...todo} />
      ))}
    </ListContainer>
  );
};

export default TodoList;
