"use client";

import { useState } from "react";
import { Todo, Category } from "@/types/todo";
import { TodoForm } from "@/components/todo/TodoForm";
import { TodoList } from "@/components/todo/TodoList";

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | "すべて">(
    "すべて"
  );

  const categories: (Category | "すべて")[] = [
    "すべて",
    "仕事",
    "個人",
    "買い物",
    "その他",
  ];

  const addTodo = (text: string, category: Category, dueDate?: Date) => {
    setTodos([
      ...todos,
      { id: Date.now(), text, completed: false, category, dueDate },
    ]);
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

  const updateCategory = (id: number, category: Category) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, category } : todo))
    );
  };

  const updateDueDate = (id: number, dueDate: Date | null) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, dueDate: dueDate || undefined } : todo
      )
    );
  };

  const handleReorder = (newTodos: Todo[]) => {
    setTodos(newTodos);
  };

  const filteredTodos =
    selectedCategory === "すべて"
      ? todos
      : todos.filter((todo) => todo.category === selectedCategory);

  // 期限でソート（期限切れ、期限近い順、期限なし）
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          マイTODOリスト
        </h1>

        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors
                  ${
                    selectedCategory === category
                      ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
              >
                {category === "すべて" ? "すべて" : category}
              </button>
            ))}
          </div>
        </div>

        <TodoForm onAdd={addTodo} />
        <TodoList
          todos={sortedTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          updateCategory={updateCategory}
          updateDueDate={updateDueDate}
          onReorder={handleReorder}
        />

        {filteredTodos.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
            {selectedCategory === "すべて"
              ? "タスクがありません。新しいタスクを追加してください。"
              : "このカテゴリのタスクはありません。"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
