import React, { useState } from "react";
import "./style.scss";

export default function TodoHeader({ handleToggleForm, handleAllDone, handleRemoveAllDone }) {
  const [doneValue, setDoneValue] = useState(true);
  return (
    <header className="TodoHeader">
      <h2 className="logo">TodoList</h2>
      <nav className="controls">
        <button onClick={() => handleToggleForm()} className="btn form-btn">
          Add ToDo Item
        </button>
        <button onClick={() => handleAllDone(doneValue)} className="btn form-btn">
          Set All As Done
        </button>
        <button onClick={() => handleRemoveAllDone()} className="btn form-btn">
          Remove Finished Items
        </button>
      </nav>
    </header>
  );
}
