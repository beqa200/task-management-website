import React, { useContext } from "react";
import styled from "styled-components";
import { MyContext } from "../App";
import { StyledButton, theme } from "../styled-components";
import { arrowDown, add, logoMobile, verticalEllipsis } from "../assets";
export default function Header() {
  const context = useContext(MyContext);
  return (
    <HeaderWrapper theme={context}>
      <div>
        <img className="logo" src={logoMobile} />
        <h1>Platform Launch</h1>
        <img src={arrowDown} />
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

const HeaderWrapper = styled.header`
  background-color: ${theme.dark.headerColor};
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

  h1 {
    margin-left: 16px;
    margin-right: 8px;
  }

  button {
    margin-right: 16px;
  }

  h1 {
    color: ${theme.dark.headerText};
    font-size: 18px;
    height: 23px;
  }

  img {
    object-fit: none;
  }
`;
