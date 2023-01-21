import { Helmet } from "react-helmet";
import { GlobalStyle, theme } from "./styled-components";
import { BrowserRouter } from "react-router-dom";
import { createContext } from "react";
import { Header } from "./components";

export const MyContext = createContext<ContextProps | null>(null);
function App() {
  return (
    <MyContext.Provider value={theme}>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <GlobalStyle />

      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
