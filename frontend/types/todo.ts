export type Category = "仕事" | "個人" | "買い物" | "その他";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  category: Category;
  dueDate?: Date;
};

export type TodoItemProps = {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateCategory: (id: number, category: Category) => void;
  updateDueDate: (id: number, dueDate: Date | null) => void;
};
