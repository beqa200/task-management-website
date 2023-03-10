import styled from "styled-components";
import { theme } from "../GlobalStyle";

const DeleteWrapper = styled.div<{ isDark: Boolean | undefined }>`
  position: fixed;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) =>
    props.isDark == true ? theme.dark.darkGrey : theme.light.white};
  width: calc(90% - 48px);
  max-width: 416px;
  padding: 24px 24px 32px 24px;
  border-radius: 6px;

  h1 {
    font-weight: 700;
    font-size: 18px;
    line-height: 23px;
    color: #ea5555;
  }

  p {
    font-weight: 500;
    font-size: 13px;
    line-height: 23px;
    color: ${theme.dark.mediumGrey};
    margin-top: 24px;
  }

  .delete {
    margin-top: 24px;
  }

  .cancel {
    margin-top: 16px;
    background-color: ${(props) =>
      props.isDark == true ? theme.light.white : "rgba(99, 95, 199, 0.1)"};
  }
`;

export default DeleteWrapper;
