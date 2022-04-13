import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { todosAtom, todosSelector } from "./Atoms";
import TodoItem from "./TodoItem";

const ListContainer = styled.ul`
  width: 100%;
  margin: 40px 0px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TodoList = () => {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const filteredTodos = useRecoilValue(todosSelector);
  useEffect(() => {
    const savedTodos = localStorage.getItem("todoStorage");
    if (savedTodos !== null) {
      const parsedTodos = JSON.parse(savedTodos);
      console.log(parsedTodos);
      setTodos(parsedTodos);
    }
  }, []);
  return (
    <ListContainer>
      {filteredTodos.map((todo) => (
        <TodoItem {...todo} />
      ))}
    </ListContainer>
  );
};

export default TodoList;
