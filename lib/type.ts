export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export type Actions = {
  addTodo: (text: string) => void;
  updateTodo: (id: number) => void;
  removeTodo: (id: number) => void;
};

export type State={
    todo:Todo[]
}