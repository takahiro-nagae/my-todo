"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Todo, Category } from "@/types/todo";
import { TodoItem } from "./TodoItem";

type Props = {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateCategory: (id: number, category: Category) => void;
  updateDueDate: (id: number, dueDate: Date | null) => void;
  onReorder: (todos: Todo[]) => void;
};

export const TodoList = ({
  todos,
  toggleTodo,
  deleteTodo,
  updateCategory,
  updateDueDate,
  onReorder,
}: Props) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
      keyboardCodes: {
        start: ["Space", "Enter"],
        cancel: ["Escape"],
        end: ["Space", "Enter"],
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over.id);

      const newTodos = [...todos];
      const [movedTodo] = newTodos.splice(oldIndex, 1);
      newTodos.splice(newIndex, 0, movedTodo);

      onReorder(newTodos);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={todos.map((todo) => todo.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="space-y-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              updateCategory={updateCategory}
              updateDueDate={updateDueDate}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};
