import React, { useContext, useReducer } from "react";
import * as Types from "./types";

const TodoContext = React.createContext<Types.TodoContextType>(
  {} as Types.TodoContextType
);
export const useTodoContext = () => useContext(TodoContext);

export const todoReducer = (
  state: Types.State,
  action: Types.Action
): Types.State => {
  switch (action.type) {
    case Types.ActionTypes.create:
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, completed: false },
        ],
      };
    case Types.ActionTypes.toggle:
      return {
        ...state,
        todos: state.todos.map((item) => {
          if (item.id === action.payload) {
            return { ...item, completed: !item.completed };
          } else return item;
        }),
      };
    case Types.ActionTypes.delete:
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.payload),
      };
    case Types.ActionTypes.filter:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      throw new Error(`Unhandled action type`);
  }
};

const TodoContainer = (props: Types.TodoContainerType) => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: "",
  });

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContainer;
