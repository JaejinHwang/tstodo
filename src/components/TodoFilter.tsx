import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  Categories,
  categoryAtom,
  customCategoryAtom,
  customCategoryIndicator,
} from "./Atoms";

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0px;
`;

const FilterGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;

const StateSelect = styled.select`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 16px;
`;

const FilterLabel = styled.div`
  color: ${(props) => props.theme.subTextColor};
  font-size: 14px;
`;

const TodoFilter = () => {
  const [category, setCategory] = useRecoilState(categoryAtom);
  const [custom, setCustom] = useRecoilState(customCategoryAtom);
  const [customIndicator, setCustomIndicator] = useRecoilState(
    customCategoryIndicator
  );
  const onStateInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const { currentTarget } = event;
    setCategory(currentTarget.value as any);
  };
  const onCustomInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const { currentTarget } = event;
    console.log(currentTarget.value);
    setCustomIndicator(currentTarget.value as any);
  };
  useEffect(() => {
    const savedCustom = localStorage.getItem("customStorage");
    if (savedCustom !== null) {
      const parsedCustom = JSON.parse(savedCustom);
      console.log(parsedCustom);
      setCustom(parsedCustom);
    }
  }, []);
  return (
    <FilterContainer>
      <FilterGroup>
        <FilterLabel>Status Filter:</FilterLabel>
        <StateSelect value={category} onInput={onStateInput}>
          <option value={Categories.ALL}>All</option>
          <option value={Categories.TODO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </StateSelect>
      </FilterGroup>
      <FilterGroup>
        <FilterLabel>Custom Filter:</FilterLabel>
        <StateSelect onInput={onCustomInput}>
          <option value="ALL">All</option>
          {custom.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </StateSelect>
      </FilterGroup>
    </FilterContainer>
  );
};

export default TodoFilter;
