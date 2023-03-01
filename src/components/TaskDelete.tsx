import React, { useContext } from "react";
import { MyContext } from "../App";
import {
  DeleteWrapper,
  StyledRedButton,
  StyledWhiteButton,
} from "../styled-components";

export default function Delete(props: {
  taskName: string | undefined;
  platformIndex: number;
  column: number;
  taskIndex: number;
}) {
  const context = useContext(MyContext);
  return (
    <DeleteWrapper isDark={context?.isDark}>
      <h1>Delete this task?</h1>
      <p>
        Are you sure you want to delete the ‘{props.taskName}’ task and its
        subtasks? This action cannot be reversed.
      </p>
      <StyledRedButton
        className="delete"
        onClick={() => {
          const clone: any = context?.boards;
          clone[props.platformIndex].columns[props.column].tasks.splice(
            props.taskIndex,
            1
          );
          context?.setBoards(clone);
          context?.setIsTaskDetails(false);
          context?.setIsTaskDelete(false);
        }}
      >
        Delete
      </StyledRedButton>
      <StyledWhiteButton
        className="cancel"
        onClick={() => {
          context?.setIsTaskDelete(false);
        }}
      >
        Cancel
      </StyledWhiteButton>
    </DeleteWrapper>
  );
}
