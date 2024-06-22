import { useState } from "react";
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
  handleOnDelete?: () => void;
};

const TodoItem = (props: TodoItemProps) => {
  const [dialogIsopen, setDialogIsOpen] = useState(false);

  const onClose = () => setDialogIsOpen(false);

  return (
    <Card className={styles.card}>
      <div>{props.text}</div>
      <div>{getDateString(new Date(props.id))}</div>
      <div className={styles.actions}>
        <Button icon="trash" onClick={() => setDialogIsOpen(true)} />
      </div>
      <Dialog
        title="Informational dialog"
        icon="info-sign"
        isOpen={dialogIsopen}
        onClose={onClose}
      >
        <DialogBody>{`Are you sure to delete - ${props.text} ?`}</DialogBody>
        <DialogFooter
          actions={
            <>
              <Tooltip content="Sorry, I am wrong">
                <Button intent="primary" text="Close" onClick={onClose} />
              </Tooltip>
              <Tooltip content="Are you really sure?">
                <Button
                  intent="danger"
                  text="Confirm"
                  onClick={props.handleOnDelete}
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
