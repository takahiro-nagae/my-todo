"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TodoItemProps, Category } from "@/types/todo";

export const TodoItem = ({
  todo,
  toggleTodo,
  deleteTodo,
  updateCategory,
  updateDueDate,
}: TodoItemProps) => {
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [isEditingDueDate, setIsEditingDueDate] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    todo.category
  );
  const [selectedDueDate, setSelectedDueDate] = useState(
    todo.dueDate ? new Date(todo.dueDate).toISOString().slice(0, 16) : ""
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo.id,
    data: {
      type: "todo",
      todo,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    toggleTodo(todo.id);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value as Category;
    setSelectedCategory(newCategory);
    updateCategory(todo.id, newCategory);
    setIsEditingCategory(false);
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditingCategory(true);
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDueDate = e.target.value;
    setSelectedDueDate(newDueDate);
    updateDueDate(todo.id, newDueDate ? new Date(newDueDate) : null);
    setIsEditingDueDate(false);
  };

  const handleDueDateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditingDueDate(true);
  };

  const formatDueDate = (date: Date) => {
    const now = new Date();
    const dueDate = new Date(date);
    const isOverdue = dueDate < now && !todo.completed;

    const formatted = dueDate.toLocaleDateString("ja-JP", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return { formatted, isOverdue };
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm
                hover:shadow-md transition-shadow duration-200 cursor-move"
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center gap-2 flex-1">
        <div className="w-6 h-6 flex flex-col items-center justify-center text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-[-4px]"
          >
            <path d="M12 5l7 7-14 0z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-[-4px]"
          >
            <path d="M12 19l7-7-14 0z" />
          </svg>
        </div>
        <div className="flex flex-row gap-8 flex-1 min-w-0">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleCheckboxChange}
              onClick={(e) => e.stopPropagation()}
              className="w-5 h-5 rounded border-gray-300 text-blue-500 
                       focus:ring-blue-500 cursor-pointer flex-shrink-0"
            />
            <span
              className={`flex-1 min-w-0 ${
                todo.completed
                  ? "line-through text-gray-500"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {todo.text}
            </span>
            {isEditingCategory ? (
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                onBlur={() => setIsEditingCategory(false)}
                autoFocus
                className="px-2 py-1 text-xs rounded-md border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <option value="仕事">仕事</option>
                <option value="個人">個人</option>
                <option value="買い物">買い物</option>
                <option value="その他">その他</option>
              </select>
            ) : (
              <button
                type="button"
                onClick={handleCategoryClick}
                className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 
                         text-gray-600 dark:text-gray-300 hover:bg-gray-200 
                         dark:hover:bg-gray-600 transition-colors flex-shrink-0"
              >
                {todo.category}
              </button>
            )}
          </div>
          {(todo.dueDate || isEditingDueDate) && (
            <div className="flex items-start gap-2">
              {isEditingDueDate ? (
                <input
                  type="datetime-local"
                  value={selectedDueDate}
                  onChange={handleDueDateChange}
                  onBlur={() => setIsEditingDueDate(false)}
                  autoFocus
                  className="px-2 py-1 text-xs rounded-md border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : todo.dueDate ? (
                <button
                  type="button"
                  onClick={handleDueDateClick}
                  className={`px-2 py-1 text-xs rounded-md transition-colors ${
                    formatDueDate(todo.dueDate).isOverdue
                      ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800"
                      : "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
                  }`}
                >
                  📅 {formatDueDate(todo.dueDate).formatted}
                </button>
              ) : null}
              {!isEditingDueDate && !todo.dueDate && (
                <button
                  type="button"
                  onClick={handleDueDateClick}
                  className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-700 
                           text-gray-600 dark:text-gray-300 hover:bg-gray-200 
                           dark:hover:bg-gray-600 transition-colors"
                >
                  + 期限設定
                </button>
              )}
            </div>
          )}
          {!todo.dueDate && !isEditingDueDate && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDueDateClick}
                className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-700 
                         text-gray-600 dark:text-gray-300 hover:bg-gray-200 
                         dark:hover:bg-gray-600 transition-colors"
              >
                + 期限設定
              </button>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteTodo(todo.id);
        }}
        className="text-gray-400 hover:text-red-500 focus:outline-none flex-shrink-0 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mt-1"
        aria-label="削除"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      </button>
    </li>
  );
};
