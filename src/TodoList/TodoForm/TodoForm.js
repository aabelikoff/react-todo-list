import React, { useState, useEffect } from "react";
import "./style.scss";

export default function TodoForm({ todoItem, onEdit, onAdd, isShown, handleToggleForm }) {
  const [formData, setFormData] = useState(todoItem);
  console.log(todoItem);

  useEffect(() => {
    setFormData(todoItem);
  }, [todoItem]);

  const handleChangeFormData = (e, key) => {
    if (key === "done") {
      setFormData({ ...formData, done: !formData.done });
    } else {
      setFormData({ ...formData, [key]: e.target.value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.title && !formData.description) {
      handleToggleForm();
      return;
    }
    if ("id" in formData) {
      onEdit({ ...formData });
    } else {
      console.log(formData);
      onAdd({ ...formData });
    }
    setFormData({ title: "", description: "", done: false });
    handleToggleForm();
  };
  return (
    isShown && (
      <div className="form-container">
        <form onSubmit={e => handleSubmit(e)}>
          <label>
            <span>Title</span>
            <input type="text" name="title" value={formData.title} onChange={e => handleChangeFormData(e, "title")} />
          </label>
          <label>
            <span>Description</span>
            <textarea type="text" name="description" value={formData.description} onChange={e => handleChangeFormData(e, "description")}></textarea>
          </label>
          <label>
            <span>Is Done</span>
            <div className="checkbox-wrapper">
              <input type="checkbox" name="done" checked={formData.done} onChange={e => handleChangeFormData(e, "done")} />
            </div>
          </label>
          <div className="form-controls">
            <button type="submit" className="btn form-btn">
              {todoItem.id ? "Change" : "Add"}
            </button>
            <button onClick={handleToggleForm} type="button" className="btn form-btn">
              Close Form
            </button>
          </div>
        </form>
      </div>
    )
  );
}
