import { Helmet } from "react-helmet";
import { GlobalStyle, theme } from "./styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
import { Header } from "./components";
import data from "./data.json";
import Board from "./pages/Board";
import { ContextProps, Platform } from "./vite-env";
import Add from "./pages/Add";
import BoardMenu from "./components/BoardMenu";

const boards: Platform[] | null = data.boards

export const MyContext = createContext<ContextProps | null>(null);

function App() {
  const [platform, setPlatform] = useState<string | undefined>(boards?.[0].name);
  const [boardMenu, setBoardMenu] = useState<boolean>(false);

  return (
    <MyContext.Provider value={{boards, theme, platform, setPlatform, boardMenu, setBoardMenu }}>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <GlobalStyle />

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/:platform" element={<Board />} />
          <Route path="/" element={<Add />} />
        </Routes>
      </BrowserRouter>

      {boardMenu && <BoardMenu />}

    </MyContext.Provider>
  );
}

export default App;
