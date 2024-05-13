function getInitialList() {
  return localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : [];
}

function saveTodoList(newList) {
  localStorage.setItem("todoList", JSON.stringify(newList));
}

let todoId = 3;

export const initialList = getInitialList();

export function todoListReducer(state, action) {
  let newList;
  switch (action.type) {
    case "add": {
      const newTodoItem = { ...action.item };
      newTodoItem.id = todoId++;
      newList = [...state, newTodoItem];
      break;
    }
    case "change_item": {
      newList = state.map(t => {
        if (t.id === action.id) {
          return { ...action.item, id: action.id };
        } else {
          return t;
        }
      });
      break;
    }
    case "toggle_done": {
      newList = state.map(t => {
        if (t.id === action.id) {
          return { ...t, done: !t.done };
        }
        return { ...t };
      });
      break;
    }
    case "delete_item": {
      newList = state.filter(t => t.id !== action.id);
      break;
    }
    case "set_all_done": {
      newList = state.map(t => ({ ...t, done: action.value }));
      break;
    }
    case "remove_all_done": {
      newList = state.filter(t => !t.done);
      break;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
  saveTodoList(newList);
  return newList;
}
