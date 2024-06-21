import React, { useContext, useReducer } from "react";
import * as Types from "./types";

const TodoContext = React.createContext({});
export const useTodoContext = () => useContext(TodoContext);

const todoReducer = (state: Types.State, action: Types.Action): Types.State => {
  switch (action.type) {
    case Types.ActionTypes.create:
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case Types.ActionTypes.toggle:
      return state.map((item) => {
        if (item.id === action.payload) {
          return { ...item, completed: !item.completed };
        } else return item;
      });
    case Types.ActionTypes.delete:
      return state.filter((item) => item.id !== action.payload);
    default:
      throw new Error(`Unhandled action type`);
  }
};

const TodoContainer = (props: Types.TodoContainerType) => {
  const [items, dispatch] = useReducer(todoReducer, []);

  return (
    <TodoContext.Provider value={{ items, dispatch }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContainer;
