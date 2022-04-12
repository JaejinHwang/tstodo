import { atom } from "recoil";

export interface ITodo {
  date: number;
  text: string;
  category: "TO DO" | "DOING" | "DONE";
}

export const todosAtom = atom<ITodo[]>({
  key: "Todos",
  default: [],
});
