import { atom, selector } from "recoil";

export enum Categories {
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
  "ALL" = "ALL",
}

export interface ITodo {
  date: number;
  text: string;
  category: Categories;
  custom?: string;
}

export const categoryAtom = atom({
  key: "CategoryAtom",
  default: Categories.ALL,
});

export const todosAtom = atom<ITodo[]>({
  key: "TodosAtom",
  default: [],
});

export const customCategoryAtom = atom({
  key: "CustomCategoryAtom",
  default: ["🚨", "💤"],
});

export const customCategoryIndicator = atom({
  key: "CustomCategoryIndicator",
  default: "ALL",
});

// export const customSelector = selector({
//   key: "CustomSelector",
//   get: ({ get }) => {
//     const todos = get(todosAtom);
//     const custom = get(customCategoryIndicator);
//     return todos.filter((todo) =>
//       custom === "All" ? todo : todo.custom === custom
//     );
//   },
// });

export const todosSelector = selector({
  key: "TodosSelector",
  get: ({ get }) => {
    const todos = get(todosAtom);
    const category = get(categoryAtom);
    const custom = get(customCategoryIndicator);
    const todoFilter = todos.filter((todo) =>
      category === "ALL" ? todo : todo.category === category
    );
    const customFilter = todoFilter.filter((todo) =>
      custom === "ALL" ? todo : todo.custom === custom
    );
    return customFilter;
  },
});
