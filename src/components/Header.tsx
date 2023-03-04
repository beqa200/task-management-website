import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { MyContext } from "../App";
import { StyledButton, theme } from "../styled-components";
import {
  arrowDown,
  add,
  logoMobile,
  verticalEllipsis,
  logoDesktopDark,
  logoDesktopLight,
} from "../assets";
import { ContextProps } from "../vite-env";

export default function Header() {
  const context = useContext<ContextProps | null>(MyContext);

  const platform: any = context?.boards?.find(
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
      boardLength={context?.boards.length}
    >
      {context?.isMore && (
        <div className="more">
          <p
            className="edit"
            onClick={() => {
              context?.setIsTaskDetails(false);
              context?.setIsEditBoard(true);
              context?.setIsMore(false);
            }}
          >
            Edit Board
          </p>
          <p
            className="delete"
            onClick={() => {
              context?.setIsBoardDelete(true);
              context?.setIsMore(false);
            }}
          >
            Delete Board
          </p>
        </div>
      )}
      <div className="wrapper">
        <img className="logo mobile" src={logoMobile} />
        <div className="logo-wrapper">
          <img className="logo-light tablet" src={logoDesktopDark} />
          <img className="logo-dark tablet" src={logoDesktopLight} />
        </div>
        <h1
          className="mobile"
          onClick={() => {
            context?.setBoardMenu(!context.boardMenu);
            context?.setIsTaskDetails(false);
            context?.setIsAddTask(false);
            context?.setIsMore(false);
          }}
        >
          {context?.platform}
        </h1>
        <h1
          className="tablet"
          style={
            context?.boardMenu == false
              ? { marginLeft: "24px", transition: "1.4s" }
              : { marginLeft: "100px", transition: "1.4s" }
          }
        >
          {context?.platform}
        </h1>
        <img
          src={arrowDown}
          className="arrow mobile"
          onClick={() => {
            context?.setBoardMenu(!context.boardMenu);
            context?.setIsTaskDetails(false);
            context?.setIsAddTask(false);
            context?.setIsMore(false);
          }}
        />
      </div>

      <div className="wrapper">
        <StyledButton
          className="mobile"
          onClick={() => {
            if (
              context?.boards &&
              (context?.boards[context?.boards.indexOf(platform)].columns
                .length > 0 ||
                context.boards.length > 0)
            ) {
              context?.setIsAddTask(true);
              if (context?.documentWidth < 768) {
                context?.setBoardMenu(false);
              }
              context?.setIsTaskDetails(false);
              context?.setIsMore(false);
            }
          }}
        >
          <img src={add} />
        </StyledButton>
        <StyledButton
          className="tablet"
          style={{ height: "48px" }}
          onClick={() => {
            if (
              context?.boards &&
              context?.boards[context?.boards.indexOf(platform)].columns
                .length > 0 &&
              context.boards.length > 0
            ) {
              context?.setIsAddTask(true);
              if (context?.documentWidth < 768) {
                context?.setBoardMenu(false);
              }
              context?.setIsTaskDetails(false);
              context?.setIsMore(false);
            }
          }}
        >
          + Add New Task
        </StyledButton>
        <img
          className="more-icon"
          src={verticalEllipsis}
          onClick={() => {
            if (context?.boards && context?.boards.length > 0) {
              context?.setIsMore(!context?.isMore);
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
  boardLength: number | undefined;
}>`
  .tablet {
    display: none;
  }

  @media (min-width: 768px) {
    .mobile {
      display: none;
    }
    .tablet {
      display: block;
    }
  }

  background-color: ${(props) =>
    props.isDark == true ? theme.dark.darkGrey : theme.light.white};
  transition: 1s;

  height: 64px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    height: 80px;
  }

  .more {
    background-color: ${(props) =>
      props.isDark == true ? theme.dark.darkGrey : theme.light.white};
    transition: 1s;

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

      &:hover {
        @media (min-width: 1440px) {
          cursor: pointer;
          opacity: 0.7;
        }
      }
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

  @media (min-width: 768px) {
    .logo-wrapper {
      height: 80px;
      display: flex;
      align-items: center;
      border-right: ${(props) =>
        props.isDark == true ? "1px solid #3E3F4E" : "1px solid #E4EBFA"};
      transition: 1s;
    }

    .logo-dark {
      display: ${(props) => (props.isDark == true ? "block" : "none")};
      padding: 0 24px;
    }

    .logo-light {
      display: ${(props) => (props.isDark == true ? "none" : "block")};
      padding: 0 24px;
    }
  }

  .more-icon {
    margin-right: 11px;
    padding: 5px;

    @media (min-width: 768px) {
      margin-right: 25px;
    }

    @media (min-width: 1440px) {
      &:hover {
        cursor: pointer;
      }
    }
  }

  .arrow {
    rotate: ${(props) => (props.boardMenu == true ? "180deg" : "0deg")};
    transition: 0.2s;
  }

  button {
    margin-right: 16px;
    opacity: ${(props) =>
      props.columnLength == 0 || props.boardLength == 0 ? "0.5" : "1"};
  }

  h1 {
    color: ${(props) => (props.isDark == true ? theme.dark.white : "black")};
    transition: 1s;
    font-size: 18px;
    height: 23px;
    margin-left: 16px;
    margin-right: 8px;

    @media (min-width: 768px) {
      font-size: 20px;
    }
  }

  img {
    object-fit: none;
  }
`;
