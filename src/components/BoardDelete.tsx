import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";
import {
  DeleteWrapper,
  StyledRedButton,
  StyledWhiteButton,
} from "../styled-components";

export default function Delete(props: {
  platformName: string;
  platformIndex: number;
}) {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const platform: any = context?.boards?.find(
    (item) => item.name == context.platform
  );
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
      <h1>Delete this board?</h1>
      <p>
        Are you sure you want to delete the ‘{props.platformName}’ board? This
        action will remove all columns and tasks and cannot be reversed.
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
