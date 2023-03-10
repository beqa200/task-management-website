import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { MyContext } from "../App";
import { AddBoard, BoardMenu } from "../components";

export default function Add() {
  const context = useContext(MyContext);
  console.log(context?.boards.length);
  useEffect(() => {
    context?.setPlatform("");
  }, [])
  
  return (
    <AddWrapper boardMenu={context?.boardMenu}>
      {context?.isNewBoard && <AddBoard />}
      {context?.boardMenu && <BoardMenu />}
      <h1 className="add">
        {context?.boards.length == 0
          ? "Please Add Platform"
          : "Please Choose Platform"}
      </h1>
    </AddWrapper>
  );
}

const AddWrapper = styled.div<{ boardMenu: Boolean | undefined }>`
  height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: auto;
  .add {
    text-align: center;
    color: #828fa3;
    position: absolute;
    top: 50%;
    @media (min-width: 768px) {
      transition: 1s;
      left: ${(props) =>
        props.boardMenu ? "calc(50% - 60px)" : "calc(50% - 150px)"};
    }
  }
`;
