"use client";

import { useState } from "react";
import { Todo } from "@/types/todo";
import { TodoForm } from "@/components/todo/TodoForm";
import { TodoList } from "@/components/todo/TodoList";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleReorder = (newTodos: Todo[]) => {
    setTodos(newTodos);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          マイTODOリスト
        </h1>

        <TodoForm onAdd={addTodo} />
        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          onReorder={handleReorder}
        />

        {todos.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
            タスクがありません。新しいタスクを追加してください。
          </p>
        )}
      </div>
    </div>
  );
}
