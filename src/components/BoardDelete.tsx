import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MyContext } from "../App";
import {
  StyledRedButton,
  StyledWhiteButton,
  theme,
} from "../styled-components";
import { DeleteWrapper } from "./TaskDelete";

export default function Delete(props: {
  platformName: string;
  platformIndex: number;
}) {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const platform: any = context?.boards?.find(
    (item) => item.name == context.platform
  );
  console.log(props.platformIndex);
  const deleteBoard = () => {
    if (context?.boards[context?.boards.indexOf(platform) - 1]) {
      navigate(`/${context.boards[context.boards.indexOf(platform) - 1].slug}`);
      context?.setPlatform(
        context.boards[context.boards.indexOf(platform) - 1].name
      );
    } else if (context?.boards[context?.boards.indexOf(platform) + 1]) {
      navigate(`/${context.boards[context.boards.indexOf(platform) + 1].slug}`);

      context?.setPlatform(
        context.boards[context.boards.indexOf(platform) + 1].name
      );
    } else {
      navigate("/");
      context?.setPlatform("");
    }
    const clone: any = context?.boards;
    clone.splice(props.platformIndex, 1);
    context?.setBoards(clone);
    context?.setIsBoardDelete(false);
  };
  return (
    <DeleteWrapper isDark={context?.isDark}>
      <h1>Delete this task?</h1>
      <p>
        Are you sure you want to delete the ‘{props.platformName}’ task and its
        subtasks? This action cannot be reversed.
      </p>
      <StyledRedButton className="delete" onClick={deleteBoard}>
        Delete
      </StyledRedButton>
      <StyledWhiteButton
        className="cancel"
        onClick={() => {
          context?.setIsBoardDelete(false);
        }}
      >
        Cancel
      </StyledWhiteButton>
    </DeleteWrapper>
  );
}
