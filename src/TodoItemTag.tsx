import styled from "styled-components";

interface ITag {
  category: string;
  custom?: string;
}

interface ICategoryTag {
  category?: string;
}

const TagContainer = styled.div`
  display: flex;
  //   flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;

const Tag = styled.div<ICategoryTag>`
  color: ${(props) => props.theme.bgColor};
  max-width: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  //   color: #2d3436;
  font-weight: 500;
  font-size: 12px;
  padding: 4px;
  background-color: ${(props) =>
    props.category
      ? props.category === "TODO"
        ? props.theme.todoColor
        : props.category === "DOING"
        ? props.theme.doingColor
        : props.theme.doneColor
      : props.theme.subTextColor};
  border-radius: 4px;
`;

const TodoItemTag = ({ category, custom }: ITag) => {
  return (
    <TagContainer>
      <Tag category={category}>{category}</Tag>
      {custom && <Tag>{custom}</Tag>}
    </TagContainer>
  );
};

export default TodoItemTag;
