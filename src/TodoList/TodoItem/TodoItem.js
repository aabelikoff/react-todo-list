import React from "react";
import "./style.scss";

export default function TodoItem({ title, id, description, done, dispatch, onEdit, onDelete, handleToggleForm }) {
  function handleEditItem() {
    handleToggleForm();
    onEdit(id);
  }
  function handleDeleteItem() {
    onDelete();
    dispatch({
      type: "delete_item",
      id: id,
    });
  }
  return (
    <div className="TodoItem">
      <div className="todo-body">
        <h2>{title}</h2>
        <div className="todo-description">
          <p>{description}</p>
          <div className="todo-mark">
            <label>Mark as done:</label>
            <input
              type="checkbox"
              checked={done}
              onChange={() => {
                dispatch({
                  type: "toggle_done",
                  id: id,
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className="controls">
        <button onClick={handleDeleteItem} className="btn todo-btn">
          Delete
        </button>
        <button onClick={handleEditItem} className="btn todo-btn">
          Edit
        </button>
      </div>
    </div>
  );
}
