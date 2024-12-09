import { create } from "zustand";
import { Actions, State } from "../type";
import { persist } from "zustand/middleware";

export const useTodoStore = create<State & Actions>()(
  persist(
    (set) => ({
      todo: [],
      addTodo: (text: string) =>
        set((state) => ({
          todo: [
            ...state.todo,
            { id: Date.now(), text: text, completed: false },
          ],
        })),
      removeTodo: (id: number) =>
        set((state) => ({
          todo: state.todo.filter((todo) => todo.id !== id),
        })),
      updateTodo: (id: number) =>
        set((state) => ({
          todo: state.todo.map((todo) =>
            todo.id == id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
    }),

    { name: "todos" }
  )
);
