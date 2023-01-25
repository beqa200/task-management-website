import React, { useContext } from "react";
import styled from "styled-components";
import { MyContext } from "../App";
import { darkIcon, iconBoard, lightIcon } from "../assets";

export default function BoardMenu() {
  const context = useContext(MyContext);

  console.log(context?.boardMenu);
  return (
    <BoardMenuWrapper isDark={context?.isDark}>
      <p className="heading">ALL BOARDS ({context?.boards?.length})</p>

      <div className="platforms">
        {context?.boards?.map((board) => (
          <div
            className={
              context.platform == board.name
                ? "wrapper isActive"
                : "wrapper isNotActive"
            }
            onClick={() => {
              context.setPlatform(board.name);
            }}
            key={Math.random()}
          >
            <img src={iconBoard} />
            <p>{board.name}</p>
          </div>
        ))}
        <div className="create">
          <img src={iconBoard} />
          <p>+ Create New Board</p>
        </div>
      </div>

      <div className="themeSwitcher">
        <img src={darkIcon} />
        <div
          className="switcher"
          onClick={() => {
            context?.setIsDark(!context.isDark);
          }}
        >
          <div></div>
        </div>
        <img src={lightIcon} />
      </div>
    </BoardMenuWrapper>
  );
}

const BoardMenuWrapper = styled.div<{ isDark: Boolean | undefined }>`
  position: absolute;
  background-color: #2b2c37;
  width: 264px;
  border-radius: 8px;
  padding: 16px 16px 16px 0px;
  color: #828fa3;
  left: calc(50% - 142px);
  top: 80px;
  .heading {
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 2.4px;
    margin-left: 24px;
  }

  .platforms {
    margin-top: 19px;

    .wrapper {
      display: flex;
      width: 220px;
      gap: 12px;
      padding: 14px 0px 15px 24px;  
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      cursor: pointer;
      p {   
        font-weight: 700;
        font-size: 15px;
        line-height: 19px;
      }
    }

    .isActive {
      background-color: #635fc7;

      img {
        filter: invert(99%) sepia(2%) saturate(298%) hue-rotate(51deg)
          brightness(905%) contrast(100%);
      }

      p {
        color: white;
      }
    }

    .create {
      display: flex;
      gap: 12px;
      width: 175px;
      padding: 14px 0px 15px 24px;
      cursor: pointer;
      img {
        filter: invert(39%) sepia(35%) saturate(1074%) hue-rotate(204deg)
          brightness(93%) contrast(88%);
      }

      p {
        color: #635fc7;
        font-size: 15px;
        font-weight: 700;
      }
    }
  }

  .themeSwitcher {
    width: 90%;
    border-radius: 6px;
    background-color: #20212c;
    display: flex;
    justify-content: center;
    margin: 10px auto 0px;
    gap: 23px;
    padding: 14px 0px;
    .switcher {
      width: 40px;
      height: 20px;
      background-color: #635fc7;
      border-radius: 12px;
      display: flex;
      align-items: center;
      position: relative;
      cursor: pointer;

      div {
        width: 14px;
        height: 14px;
        border-radius: 100%;
        background-color: white;
        margin-left: 3px;
        position: absolute;
        right: ${(props) => (props.isDark == true ? "3px" : "23px")};
        transition: 0.2s;
      }
    }
  }
`;
