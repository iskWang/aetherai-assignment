import { Dispatch } from "react";

export type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

export type Filter = string;
export type OrderByDate = "asc" | "desc";

export enum ActionTypes {
  create = "CREATE_TODO",
  toggle = "TOGGLE_TODO",
  delete = "DELETE_TODO",
  filter = "FILTER_TODO",
  edit = "EDIT_TODO",
  orderByDate = "ORDER_BY_DATE_TODO",
}

export type Action =
  | { type: ActionTypes.create; payload: TodoItem["text"] }
  | { type: ActionTypes.toggle; payload: TodoItem["id"] }
  | { type: ActionTypes.delete; payload: TodoItem["id"] }
  | { type: ActionTypes.filter; payload: Filter }
  | { type: ActionTypes.edit; payload: Pick<TodoItem, "id" | "text"> }
  | { type: ActionTypes.orderByDate; payload: OrderByDate };

export type State = {
  todos: TodoItem[];
  filter: Filter;
  orderByDate: OrderByDate;
};

export type TodoContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export type TodoContainerType = {
  children?: React.ReactNode;
};
