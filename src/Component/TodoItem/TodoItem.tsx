import React, { useState, useRef } from "react";
import {
  Card,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Tooltip,
} from "@blueprintjs/core";
import { types as TodoContainerTypes } from "Container/Todo";

import { getDateString } from "Lib/getDateString";

import styles from "./styles.module.scss";

export type TodoItemProps = TodoContainerTypes.TodoItem & {
  handleOnDelete?: (id: TodoContainerTypes.TodoItem["id"]) => void;
  handleOnTextChange?: (
    id: TodoContainerTypes.TodoItem["id"],
    text: TodoContainerTypes.TodoItem["text"]
  ) => void;
};

const TodoItem = (props: TodoItemProps) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const [dialogIsopen, setDialogIsOpen] = useState(false);

  const _onClose = () => setDialogIsOpen(false);

  const handleTextInputMouseEnter = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const handleTextInputMouseLeave = () => {
    if (textInputRef.current) {
      textInputRef.current.blur();
    }
  };

  const _handleOnDelete = () => {
    props.handleOnDelete && props.handleOnDelete(props.id);
  };

  const _handleOnTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    props.handleOnTextChange && props.handleOnTextChange(props.id, text);
  };

  return (
    <Card className={styles.card}>
      <div>
        <input
          ref={textInputRef}
          type="text"
          value={props.text}
          onChange={_handleOnTextChange}
          onMouseEnter={handleTextInputMouseEnter}
          onMouseLeave={handleTextInputMouseLeave}
        />
      </div>
      <div>{getDateString(new Date(props.id))}</div>
      <div className={styles.actions}>
        <Button icon="trash" onClick={() => setDialogIsOpen(true)} />
      </div>
      <Dialog
        title="Informational dialog"
        icon="info-sign"
        isOpen={dialogIsopen}
        onClose={_onClose}
      >
        <DialogBody>{`Are you sure to delete - ${props.text} ?`}</DialogBody>
        <DialogFooter
          actions={
            <>
              <Tooltip content="Sorry, I am wrong">
                <Button intent="primary" text="Close" onClick={_onClose} />
              </Tooltip>
              <Tooltip content="Are you really sure?">
                <Button
                  intent="danger"
                  text="Confirm"
                  onClick={_handleOnDelete}
                />
              </Tooltip>
            </>
          }
        />
      </Dialog>
    </Card>
  );
};

export default TodoItem;
