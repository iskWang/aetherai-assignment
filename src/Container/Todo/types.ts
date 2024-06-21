export type TodoItem = {
  id: Number;
  text: string;
  completed: boolean;
};

export enum ActionTypes {
  create = "CREATE_TODO",
  toggle = "TOGGLE_TODO",
  delete = "DELETE_TODO",
}

export type Action =
  | { type: ActionTypes.create; payload: string }
  | { type: ActionTypes.toggle; payload: number }
  | { type: ActionTypes.delete; payload: null };

export type State = TodoItem[];

export type TodoContainerType = {
  children?: React.ReactNode;
};
