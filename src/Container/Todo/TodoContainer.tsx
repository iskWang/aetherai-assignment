import { useReducer } from "react";

import todoReducer from "./reducer";
import { TodoContext } from "./context";

import * as Types from "./types";

const TodoContainer = (props: Types.TodoContainerType) => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: "",
    orderByDate: "desc",
  });

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContainer;
