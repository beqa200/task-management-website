import React, { useContext, useState } from "react";
import styled from "styled-components";
import { MyContext } from "../App";
import { StyledButton, theme } from "../styled-components";
import { arrowDown, add, logoMobile, verticalEllipsis } from "../assets";
import { ContextProps } from "../vite-env";

export default function Header() {
  const context = useContext<ContextProps | null>(MyContext);

  const platform = context?.boards?.find(
    (item) => item.name == context.platform
  );
  
  return (
    <HeaderWrapper boardMenu={context?.boardMenu} isDark={context?.isDark} columnLength={platform?.columns.length}>
      <div>
        <img className="logo" src={logoMobile} />
        <h1
          onClick={() => {
            context?.setBoardMenu(!context.boardMenu);
            context?.setIsTaskDetails(false);
          }}
        >
          {context?.platform}
        </h1>
        <img
          src={arrowDown}
          className="arrow"
          onClick={() => {
            context?.setBoardMenu(!context.boardMenu);
          }}
        />
      </div>

      <div>
        <StyledButton>
          <img src={add} />
        </StyledButton>
        <img className="more" src={verticalEllipsis} />
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

  div {
    display: flex;
    align-items: center;
  }

  .logo {
    margin-left: 16px;
  }

  .more {
    margin-right: 16px;
  }

  .arrow {
    rotate: ${(props) => (props.boardMenu == true ? "180deg" : "0deg")};
    transition: 0.2s;
  }

  button {
    margin-right: 16px;
    opacity: ${props => props.columnLength == 0 ? "0.5" : "1"} 
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
