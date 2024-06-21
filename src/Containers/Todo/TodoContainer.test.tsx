import { useEffect } from "react";
import { render, screen } from "@testing-library/react";

import { describe, it, expect } from "vitest";

import TodoContainer, { todoReducer, useTodoContext } from "./TodoContainer";
import * as Types from "./types";

const TestComponent = () => {
  const { items, dispatch } = useTodoContext();

  useEffect(() => {
    dispatch({
      type: Types.ActionTypes.create,
      payload: "TestComponent didmount",
    });
  }, [dispatch]);

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
};

describe("todoReducer", () => {
  const baseItem: Types.TodoItem = {
    id: Date.now(),
    text: "Test",
    completed: false,
  };

  it("should create add a todo item", () => {
    const initState: Types.TodoItem[] = [];
    const action: Types.Action = {
      type: Types.ActionTypes.create,
      payload: baseItem.text,
    };

    const state = todoReducer(initState, action);
    expect(state).toHaveLength(1);
    expect(state[0].text).toEqual(baseItem.text);
  });

  it("should toggle todo item to true", () => {
    const testItem = {
      ...baseItem,
      completed: false,
    };
    const initState: Types.TodoItem[] = [testItem];

    const action: Types.Action = {
      type: Types.ActionTypes.toggle,
      payload: testItem.id,
    };

    const state = todoReducer(initState, action);
    expect(state).toHaveLength(1);
    expect(state[0].completed).toEqual(true);
  });

  it("should toggle todo item to false", () => {
    const testItem = {
      ...baseItem,
      completed: true,
    };
    const initState: Types.TodoItem[] = [testItem];

    const action: Types.Action = {
      type: Types.ActionTypes.toggle,
      payload: testItem.id,
    };

    const state = todoReducer(initState, action);
    expect(state).toHaveLength(1);
    expect(state[0].completed).toEqual(false);
  });

  it("should delete a todo item", () => {
    const testItem = {
      ...baseItem,
      completed: true,
    };
    const initState: Types.TodoItem[] = [testItem];

    const action: Types.Action = {
      type: Types.ActionTypes.delete,
      payload: testItem.id,
    };

    const state = todoReducer(initState, action);
    expect(state.some((el) => el.id === testItem.id)).toEqual(false);
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
