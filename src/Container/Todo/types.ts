import { Dispatch } from "react";

export type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

export type Filter = string;

export enum ActionTypes {
  create = "CREATE_TODO",
  toggle = "TOGGLE_TODO",
  delete = "DELETE_TODO",
  filter = "FILTER_TODO",
  edit = "EDIT_TODO",
}

export type Action =
  | { type: ActionTypes.create; payload: TodoItem["text"] }
  | { type: ActionTypes.toggle; payload: TodoItem["id"] }
  | { type: ActionTypes.delete; payload: TodoItem["id"] }
  | { type: ActionTypes.filter; payload: Filter }
  | { type: ActionTypes.edit; payload: Pick<TodoItem, "id" | "text"> };

export type State = {
  todos: TodoItem[];
  filter: Filter;
};

export type TodoContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export type TodoContainerType = {
  children?: React.ReactNode;
};
