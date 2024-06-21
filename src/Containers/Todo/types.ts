import { Dispatch } from "react";

export type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

export enum ActionTypes {
  create = "CREATE_TODO",
  toggle = "TOGGLE_TODO",
  delete = "DELETE_TODO",
}

export type Action =
  | { type: ActionTypes.create; payload: TodoItem["text"] }
  | { type: ActionTypes.toggle; payload: TodoItem["id"] }
  | { type: ActionTypes.delete; payload: TodoItem["id"] };

export type State = TodoItem[];

export type TodoContextType = {
  items: TodoItem[];
  dispatch: Dispatch<Action>;
};

export type TodoContainerType = {
  children?: React.ReactNode;
};
