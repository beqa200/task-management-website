import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
const theme = {
  dark: {
    veryDarkGrey: "#20212C",
    darkGrey: "#2B2C37",
    mediumGrey: "#828FA3",
    white: "#FFFFFF",
  },

  light: {
    lightGrey: "#F4F7FD",
    white: "#FFFFFF",
    black: "#000112",
  },
};

const GlobalStyle = createGlobalStyle<{
  isDark: Boolean | undefined;
  boardMenu: Boolean;
  documentWidth: Number;
  isTaskDetails: Boolean;
  isAddTask: Boolean;
  isEditTask: Boolean;
  isTaskDelete: Boolean;
  isBoardDelete: Boolean;
  isNewBoard: Boolean;
  isEditBoard: Boolean;
}>`
    * {
        margin: 0px;
        padding: 0px;
        font-family: 'Plus Jakarta Sans', sans-serif;
    }



    body {
        background-color: ${(props) =>
          props.isDark == true
            ? theme.dark.veryDarkGrey
            : theme.light.lightGrey};

          overflow: ${(props) =>
            (props.boardMenu && props.documentWidth < 768) ||
            props.isAddTask ||
            props.isTaskDetails ||
            props.isEditTask ||
            props.isTaskDelete ||
            props.isBoardDelete ||
            props.isNewBoard ||
            props.isEditBoard
              ? "hidden"
              : "auto"};
              overflow-x: hidden;
    }
    ::-webkit-scrollbar {
      width: 15px;
    }
    ::-webkit-scrollbar-track {
      background: ${(props) => (props.isDark === true ? "#393a4b" : "#E3E4F1")};
      border-radius: 5px;
      transition: 0.5s;
    }
    ::-webkit-scrollbar-thumb {
      background: ${(props) => (props.isDark === true ? "#5b5e7e" : "white")};
      border-radius: 5px;
      transition: 0.5s;
    }
    a {
      all: unset;
    }
`;

const BlackScreen = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export { GlobalStyle, theme, BlackScreen };
