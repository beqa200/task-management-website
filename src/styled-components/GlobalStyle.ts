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
  isTaskDetails: Boolean;
  isAddTask: Boolean;
  isEditTask: Boolean;
  isTaskDelete: Boolean;
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
            props.boardMenu ||
            props.isAddTask ||
            props.isTaskDetails ||
            props.isEditTask ||
            props.isTaskDelete
              ? "hidden"
              : "auto"}
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
