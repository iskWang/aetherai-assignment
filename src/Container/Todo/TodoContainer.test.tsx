import { useEffect } from "react";
import { render, screen } from "@testing-library/react";

import { describe, it, expect } from "vitest";

import TodoContainer, { todoReducer, useTodoContext } from "./TodoContainer";
import * as Types from "./types";

const TestComponent = () => {
  const { state, dispatch } = useTodoContext();

  useEffect(() => {
    dispatch({
      type: Types.ActionTypes.create,
      payload: "TestComponent didmount",
    });
  }, [dispatch]);

  return (
    <ul>
      {state.todos.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
};

describe("todoReducer", () => {
  const initState: Types.State = {
    filter: "",
    todos: [],
  };

  const testTodoItem: Types.State["todos"][0] = {
    id: Date.now(),
    text: "Test",
    completed: false,
  };

  it("should create add a todo item", () => {
    const action: Types.Action = {
      type: Types.ActionTypes.create,
      payload: testTodoItem.text,
    };

    const state = todoReducer(initState, action);
    expect(state.todos).toHaveLength(1);
    expect(state.todos[0].text).toEqual(testTodoItem.text);
  });

  it("should toggle todo item to true", () => {
    const initToggleState = {
      ...initState,
      todos: [{ ...testTodoItem }],
    };

    const action: Types.Action = {
      type: Types.ActionTypes.toggle,
      payload: testTodoItem.id,
    };

    const state = todoReducer(initToggleState, action);
    expect(state.todos[0].completed).toBe(!testTodoItem.completed);

    const newState = todoReducer(state, action);
    expect(newState.todos[0].completed).toBe(!!testTodoItem.completed);
  });

  it("should delete a todo item", () => {
    const initDeleteState = {
      ...initState,
      todos: [{ ...testTodoItem }],
    };

    const action: Types.Action = {
      type: Types.ActionTypes.delete,
      payload: testTodoItem.id,
    };

    const state = todoReducer(initDeleteState, action);
    expect(state.todos.some((el) => el.id === testTodoItem.id)).toEqual(false);
  });
});

describe("TodoContainer", () => {
  it("should provider a item and dispatch through context", () => {
    render(
      <TodoContainer>
        <TestComponent />
      </TodoContainer>
    );

    expect(screen.getByText("TestComponent didmount")).toBeInTheDocument();
  });
});
