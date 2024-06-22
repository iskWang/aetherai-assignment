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
    case Types.ActionTypes.edit:
      return {
        ...state,
        todos: state.todos.map((item) => {
          if (item.id === action.payload.id) {
            item.text = action.payload.text;
          }
          return item;
        }),
      };
    case Types.ActionTypes.orderByDate:
      return {
        ...state,
        orderByDate: action.payload,
        todos: state.todos.slice().sort((a, b) => {
          if (action.payload === "asc") {
            return a.id - b.id;
          } else {
            return b.id - a.id;
          }
        }),
      };

    default:
      throw new Error(`Unhandled action type`);
  }
};

const TodoContainer = (props: Types.TodoContainerType) => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: "",
    orderByDate: "asc",
  });

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContainer;
