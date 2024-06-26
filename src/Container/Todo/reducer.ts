import * as Types from "./types";

const orderTodos = (
  orderByDate: Types.State["orderByDate"],
  todos: Types.State["todos"]
) => {
  return todos.slice().sort((a, b) => {
    if (orderByDate === "asc") {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });
};

const todoReducer = (state: Types.State, action: Types.Action): Types.State => {
  switch (action.type) {
    case Types.ActionTypes.create: {
      const newTodos = [
        ...state.todos,
        { id: Date.now(), text: action.payload, completed: false },
      ];

      return {
        ...state,
        todos: orderTodos(state.orderByDate, newTodos),
      };
    }

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
    case Types.ActionTypes.orderByDate: {
      const orderByDate = action.payload || state.orderByDate;

      return {
        ...state,
        orderByDate,
        todos: orderTodos(orderByDate, state.todos),
      };
    }

    default:
      throw new Error(`Unhandled action type`);
  }
};

export default todoReducer;
