import React, { useReducer, useState } from "react";
import TodoHeader from "./TodoHeader/TodoHeader";
import { initialList, todoListReducer } from "./todoLiistReducer";
import TodoItem from "./TodoItem/TodoItem";
import TodoForm from "./TodoForm/TodoForm";

export default function TodoList() {
  const [todoList, dispatch] = useReducer(todoListReducer, initialList);
  const [selectedItem, setSelectedItem] = useState({ title: "", description: "", done: false });
  const [isFormDisplay, setIsFormDisplay] = useState(false);

  const handleSelectItem = id => {
    const newSelectedItem = todoList.some(t => t.id === id) ? todoList.filter(t => t.id === id) : {};
    setSelectedItem(...newSelectedItem);
  };

  const handleResetSelectedItem = () => {
    setSelectedItem({ title: "", description: "", done: "" });
  };

  const handleEditItem = changedItem => {
    dispatch({
      type: "change_item",
      item: changedItem,
      id: changedItem.id,
    });
  };

  const handleAddItem = newItem => {
    dispatch({
      type: "add",
      item: newItem,
    });
  };

  const handleToggleForm = () => {
    handleResetSelectedItem();
    setIsFormDisplay(!isFormDisplay);
  };

  const handleAllDone = val => {
    dispatch({
      type: "set_all_done",
      value: val,
    });
  };

  const handleRemoveAllDone = () => {
    dispatch({
      type: "remove_all_done",
    });
  };

  return (
    <section>
      <TodoHeader handleToggleForm={handleToggleForm} handleAllDone={handleAllDone} handleRemoveAllDone={handleRemoveAllDone} />
      <main>
        <ul>
          {todoList.map(t => (
            <TodoItem {...t} key={t.id} dispatch={dispatch} onEdit={handleSelectItem} onDelete={handleResetSelectedItem} handleToggleForm={handleToggleForm} />
          ))}
        </ul>
        <TodoForm dispatch={dispatch} todoItem={selectedItem} onEdit={handleEditItem} onAdd={handleAddItem} isShown={isFormDisplay} handleToggleForm={handleToggleForm} />
      </main>
    </section>
  );
}
