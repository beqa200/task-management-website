import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";
export default function Board() {
    const params = useParams();
    console.log(params);
   
  return <BoardWrapper>
    
  </BoardWrapper>;
}

const BoardWrapper = styled.div``;
