import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const theme = {
  dark: {
    backgroundColor: "#20212C",
    headerColor: "#2B2C37",
    headerText: "#FFFFFF"
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
