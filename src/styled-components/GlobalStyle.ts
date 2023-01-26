import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
const theme = {
  dark: {
    backgroundColor: "#20212C",
    darkGrey: "#2B2C37",
    white: "#FFFFFF",
  },

  light: {
    backgroundColor: "#F4F7FD",
    white: "#FFFFFF",
    black: "#000112",
  },
};

const GlobalStyle = createGlobalStyle<{isDark: Boolean | undefined}>`
    * {
        margin: 0px;
        padding: 0px;
        font-family: 'Plus Jakarta Sans', sans-serif;
    }

    html {
     box-sizing: border-box;
    }

    body {
        background-color: ${props => props.isDark == true ? theme.dark.backgroundColor : theme.light.backgroundColor};
        box-sizing: border-box;

        
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
