import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { MyContext } from "../App";
import { AddBoard, BoardMenu } from "../components";

export default function Add() {
  const navigate = useNavigate();
  const context = useContext(MyContext);

  useEffect(() => {
    if (context?.boards?.length != 0) {
      navigate("/" + context?.boards?.[0].slug);
    }
  }, [context?.boards?.length]);

  return (
    <AddWrapper>
      {context?.isNewBoard && <AddBoard />}
      {context?.boardMenu && <BoardMenu />}
      <h1>Please Add Platform</h1>
    </AddWrapper>
  );
}

const AddWrapper = styled.div`
  height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    width: calc(100% - 280px);
  }
  margin-left: auto;
  h1 {
    text-align: center;
    color: #828fa3;
  }
`;
