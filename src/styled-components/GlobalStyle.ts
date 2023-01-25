import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const theme = {
  dark: {
    backgroundColor: "#20212C",
    darkGrey: "#2B2C37",
    white: "#FFFFFF",
  },

  light: {
    white: "#FFFFFF",
    black: "#000112"
  },
};

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
        font-family: 'Plus Jakarta Sans', sans-serif;
    }

    body {
        background-color: ${theme.dark.backgroundColor}
    }
`;

export { GlobalStyle, theme };
