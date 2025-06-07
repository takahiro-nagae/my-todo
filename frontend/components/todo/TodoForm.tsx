"use client";

import { useState, FormEvent } from "react";
import { Category } from "@/types/todo";

type Props = {
  onAdd: (text: string, category: Category, dueDate?: Date) => void;
};

export const TodoForm = ({ onAdd }: Props) => {
  const [newTodo, setNewTodo] = useState("");
  const [category, setCategory] = useState<Category>("その他");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const dueDateObj = dueDate ? new Date(dueDate) : undefined;
      onAdd(newTodo.trim(), category, dueDateObj);
      setNewTodo("");
      setCategory("その他");
      setDueDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="新しいタスクを入力..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="仕事">仕事</option>
            <option value="個人">個人</option>
            <option value="買い物">買い物</option>
            <option value="その他">その他</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     transition-colors"
          >
            追加
          </button>
        </div>
        <div className="flex gap-2">
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="期限日時（任意）"
          />
          {dueDate && (
            <button
              type="button"
              onClick={() => setDueDate("")}
              className="px-3 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
                       dark:hover:text-gray-200 transition-colors"
              title="日時をクリア"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
