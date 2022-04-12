import styled from "styled-components";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const Viewport = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Background = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  padding: 0px 20px;
`;

const Header = styled.div`
  width: 100%;
  text-align: left;
  font-size: 40px;
  line-height: 50px;
  font-weight: 500;
  color: ${(props) => props.theme.textColor};
  margin: 74px 0px;
`;

const TodoInterface = () => {
  return (
    <Viewport>
      <Background>
        <Header>Todos</Header>
        <TodoInput />
        <TodoList />
      </Background>
    </Viewport>
  );
};

export default TodoInterface;
