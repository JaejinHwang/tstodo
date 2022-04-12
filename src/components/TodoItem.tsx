import { ITodo } from "./Atoms";
import styled from "styled-components";

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
  return (
    <ItemContainer>
      <span>{text}</span>
      <span>{category}</span>
      <button>start</button>
    </ItemContainer>
  );
};

export default TodoItem;
