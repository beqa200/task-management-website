import React, { useContext } from "react";
import styled from "styled-components";
import { MyContext } from "../App";
import {
  StyledRedButton,
  StyledWhiteButton,
  theme,
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

export const DeleteWrapper = styled.div<{ isDark: Boolean | undefined }>`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) =>
    props.isDark == true ? theme.dark.darkGrey : theme.light.white};
  width: calc(90% - 48px);
  max-width: 416px;
  padding: 24px 24px 32px 24px;
  border-radius: 6px;

  h1 {
    font-weight: 700;
    font-size: 18px;
    line-height: 23px;
    color: #ea5555;
  }

  p {
    font-weight: 500;
    font-size: 13px;
    line-height: 23px;
    color: ${theme.dark.mediumGrey};
    margin-top: 24px;
  }

  .delete {
    margin-top: 24px;
  }

  .cancel {
    margin-top: 16px;
    background-color: ${(props) =>
      props.isDark == true
        ? theme.light.white
        : "rgba(99, 95, 199, 0.1)"};
  }
`;
