export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export type TodoItemProps = {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};
