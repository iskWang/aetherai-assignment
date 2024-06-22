import { useState } from "react";
import { useTodoContext, types as TodoTypes } from "Container/Todo";

import TodoItem, { TodoItemProps } from "Component/TodoItem";
import {
  Section,
  CardList,
  InputGroup,
  Button,
  Tooltip,
} from "@blueprintjs/core";
import styles from "./styles.module.scss";

const Title = () => {
  const { state, dispatch } = useTodoContext();

  const _onClick = () => {
    dispatch({
      type: TodoTypes.ActionTypes.orderByDate,
      payload: state.orderByDate === "desc" ? "asc" : "desc",
    });
  };

  return (
    <div className="inline-flex items-center">
      <Button
        className="mr-5"
        icon={state.orderByDate === "desc" ? "sort-asc" : "sort-desc"}
        onClick={_onClick}
      />
      <h3>Todo APP</h3>
    </div>
  );
};

const ActionBar = (props: {
  handleOnCreate: (value: string) => void;
  handleOnFilter: (value: string) => void;
}) => {
  const [tempNewText, setTempNewText] = useState("");

  const onCreate = () => {
    props.handleOnCreate(tempNewText);
    setTempNewText("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onCreate();
    }
  };

  return (
    <div className={styles.actionBar}>
      <InputGroup
        className={styles.actionInput}
        leftIcon="search"
        placeholder="Filter histogram..."
        onValueChange={props.handleOnFilter}
      />

      <div onKeyDown={handleKeyDown}>
        <InputGroup
          className={styles.actionInput}
          leftIcon="add"
          intent="success"
          placeholder="Create something new!"
          value={tempNewText}
          onValueChange={setTempNewText}
          rightElement={
            <Tooltip content="Click me!" position="right">
              <Button
                icon="arrow-right"
                minimal
                outlined={false}
                onClick={onCreate}
              />
            </Tooltip>
          }
        />
      </div>
    </div>
  );
};

const TodoPresentation = () => {
  const { state, dispatch } = useTodoContext();

  const _handleOnCreate = (value: string) => {
    if (!value) return;

    dispatch({
      type: TodoTypes.ActionTypes.create,
      payload: value,
    });
  };

  const _handleOnFilter = (text: TodoTypes.TodoItem["text"]) => {
    dispatch({ type: TodoTypes.ActionTypes.filter, payload: text });
  };

  const _handleOnDelete: TodoItemProps["handleOnDelete"] = (id) => {
    dispatch({ type: TodoTypes.ActionTypes.delete, payload: id });
  };

  const _handleOnTextChange: TodoItemProps["handleOnTextChange"] = (
    id,
    text
  ) => {
    dispatch({
      type: TodoTypes.ActionTypes.edit,
      payload: { id, text },
    });
  };

  const _handleOnToggle: TodoItemProps["handleOnToggle"] = (id) => {
    dispatch({
      type: TodoTypes.ActionTypes.toggle,
      payload: id,
    });
  };

  return (
    <Section
      title={<Title />}
      className={styles.container}
      rightElement={
        <ActionBar
          handleOnCreate={_handleOnCreate}
          handleOnFilter={_handleOnFilter}
        />
      }
    >
      <CardList bordered className="h-[500px]">
        {state.todos
          .filter((el) => el.text.toLowerCase().includes(state.filter))
          .map((item) => (
            <TodoItem
              key={item.id}
              {...item}
              handleOnDelete={_handleOnDelete}
              handleOnTextChange={_handleOnTextChange}
              handleOnToggle={_handleOnToggle}
            />
          ))}
      </CardList>
    </Section>
  );
};

export default TodoPresentation;
