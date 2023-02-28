import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MyContext } from "../App";
import { StyledButton, theme } from "../styled-components";
import { arrowDown, add, logoMobile, verticalEllipsis } from "../assets";
import { ContextProps } from "../vite-env";
import { useParams } from "react-router";

export default function Header() {
  const context = useContext<ContextProps | null>(MyContext);
  const [isMore, setIsMore] = useState(false);
  const params = useParams();
  const platform = context?.boards?.find(
    (item) => item.name == context.platform
  );

  useEffect(() => {
    const storedPlatform = localStorage.getItem("platform");
    if (storedPlatform) {
      context?.setPlatform(storedPlatform);
    }
  }, []);
  return (
    <HeaderWrapper
      boardMenu={context?.boardMenu}
      isDark={context?.isDark}
      columnLength={platform?.columns.length}
    >
      {isMore && (
        <div className="more">
          <p
            className="edit"
            onClick={() => {
              context?.setIsTaskDetails(false), context?.setIsEditTask(true);
            }}
          >
            Edit Board
          </p>
          <p
            className="delete"
            onClick={() => {
              context?.setIsBoardDelete(true);
              setIsMore(false);
            }}
          >
            Delete Board
          </p>
        </div>
      )}
      <div className="wrapper">
        <img className="logo" src={logoMobile} />
        <h1
          onClick={() => {
            context?.setBoardMenu(!context.boardMenu);
            context?.setIsTaskDetails(false);
            context?.setIsAddTask(false);
            setIsMore(false);
          }}
        >
          {context?.platform}
        </h1>
        <img
          src={arrowDown}
          className="arrow"
          onClick={() => {
            context?.setBoardMenu(!context.boardMenu);
            context?.setIsTaskDetails(false);
            context?.setIsAddTask(false);
            setIsMore(false);
          }}
        />
      </div>

      <div className="wrapper">
        <StyledButton
          onClick={() => {
            if (context?.boards && context?.boards.length > 0) {
              context?.setIsAddTask(true);
              context?.setBoardMenu(false);
              context?.setIsTaskDetails(false);
              setIsMore(false);
            }
          }}
        >
          <img src={add} />
        </StyledButton>
        <img
          className="more-icon"
          src={verticalEllipsis}
          onClick={() => {
            if (context?.boards && context?.boards.length > 0) {
              setIsMore(!isMore);
            }
          }}
        />
      </div>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header<{
  boardMenu: Boolean | undefined;
  isDark: Boolean | undefined;
  columnLength: number | undefined;
}>`
  background-color: ${(props) =>
    props.isDark == true ? theme.dark.darkGrey : theme.light.white};
  height: 64px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .more {
    background-color: ${(props) =>
      props.isDark == true ? theme.dark.darkGrey : theme.light.white};
    position: absolute;
    padding: 16px;
    box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25);
    border-radius: 8px;
    right: 24px;
    top: 60px;
    z-index: 10;
    p {
      font-weight: 500;
      font-size: 13px;
      line-height: 23px;
      color: #828fa3;
      width: 160px;
    }

    .delete {
      color: #ea5555;
      margin-top: 16px;
    }
  }

  .wrapper {
    display: flex;
    align-items: center;
  }

  .logo {
    margin-left: 16px;
  }

  .more-icon {
    margin-right: 16px;
  }

  .arrow {
    rotate: ${(props) => (props.boardMenu == true ? "180deg" : "0deg")};
    transition: 0.2s;
  }

  button {
    margin-right: 16px;
    opacity: ${(props) => (props.columnLength == 0 ? "0.5" : "1")};
  }

  h1 {
    color: ${(props) => (props.isDark == true ? theme.dark.white : "black")};

    font-size: 18px;
    height: 23px;
    margin-left: 16px;
    margin-right: 8px;
  }

  img {
    object-fit: none;
  }
`;
