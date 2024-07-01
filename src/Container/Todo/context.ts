import React, { useContext } from "react";
import * as Types from "./types";

const TodoContext = React.createContext<Types.TodoContextType>(
  {} as Types.TodoContextType
);

const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error(`useTodoContext must be used within a TodoProvider`);
  }

  return context;
};

export { TodoContext, useTodoContext };
