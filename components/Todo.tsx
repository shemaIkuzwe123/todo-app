"use client";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useTodoStore } from "@/lib/store";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function Todo() {
  const {
    todo: todos,
    addTodo: newTodo,
    removeTodo,
    updateTodo,
  } = useTodoStore();

  const addTodo = (formData: FormData) => {
    const text = formData.get("text") as string;
    if (text.trim()) {
      newTodo(text.trim());
    }
  };
  return (
    <>
      <form action={addTodo} className="flex mb-4">
        <Input
          type="text"
          name="text"
          placeholder="Add a new todo..."
          className="flex-grow mr-2"
        />
        <Button type="submit">
          <Plus className="h-5 w-5" />
          <span className="sr-only">Add Todo</span>
        </Button>
      </form>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center bg-gray-50 rounded-md p-2"
          >
            <Checkbox
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onCheckedChange={() => updateTodo(todo.id)}
              className="mr-2"
            />
            <label
              htmlFor={`todo-${todo.id}`}
              className={`flex-grow ${
                todo.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {todo.text}
            </label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeTodo(todo.id)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
              <span className="sr-only">Delete</span>
            </Button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No todos yet. Add one above!
        </p>
      )}
    </>
  );
}
