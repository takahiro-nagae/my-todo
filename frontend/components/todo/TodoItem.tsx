"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TodoItemProps } from "@/types/todo";

export const TodoItem = ({ todo, toggleTodo, deleteTodo }: TodoItemProps) => {
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

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm
                hover:shadow-md transition-shadow duration-200 cursor-move"
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="w-6 h-6 flex flex-col items-center justify-center text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">
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
        <div
          className="flex items-center gap-2 flex-1"
          onClick={(e) => e.stopPropagation()}
        >
          <label
            className="flex items-center gap-2 cursor-pointer flex-1"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleCheckboxChange}
              onClick={(e) => e.stopPropagation()}
              className="w-5 h-5 rounded border-gray-300 text-blue-500 
                       focus:ring-blue-500 cursor-pointer"
            />
            <span
              className={`flex-1 ${
                todo.completed
                  ? "line-through text-gray-500"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {todo.text}
            </span>
          </label>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteTodo(todo.id);
        }}
        className="text-gray-400 hover:text-red-500 focus:outline-none flex-shrink-0 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
