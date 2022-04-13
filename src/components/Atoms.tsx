import { atom, selector } from "recoil";

export enum Categories {
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface ITodo {
  date: number;
  text: string;
  category: Categories;
}

export const categoryAtom = atom({
  key: "CategoryAtom",
  default: Categories.TODO,
});

export const todosAtom = atom<ITodo[]>({
  key: "TodosAtom",
  default: [],
});

export const customCategoryAtom = atom({
  key: "CustomCategoryAtom",
  default: ["t", "e", "s"],
});

export const todosSelector = selector({
  key: "TodosSelector",
  get: ({ get }) => {
    const todos = get(todosAtom);
    const category = get(categoryAtom);
    return todos.filter((todo) => todo.category === category);
  },
});
