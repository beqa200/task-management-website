import { Helmet } from "react-helmet";
import { BlackScreen, GlobalStyle, theme } from "./styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { Header } from "./components";
import data from "./data.json";
import Board from "./pages/Board";
import { ContextProps, Platform, Task } from "./vite-env";
import Add from "./pages/Add";
import BoardMenu from "./components/BoardMenu";

export const MyContext = createContext<ContextProps | null>(null);

function App() {
  //global states
  const [boards, setBoards] = useState<Platform[]>(data.boards);

  const [platform, setPlatform] = useState<string | undefined>();


  
  const [boardMenu, setBoardMenu] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isTaskDetails, setIsTaskDetails] = useState<boolean>(false);
  const [taskDetails, setTaskDetails] = useState<Task | undefined>();
  const [isAddTask, setIsAddTask] = useState<Boolean>(false);
  const [isEditTask, setIsEditTask] = useState<Boolean>(false);
  const [isTaskDelete, setIsTaskDelete] = useState<Boolean>(false);
  const [isBoardDelete, setIsBoardDelete] = useState<Boolean>(false);

  useEffect(() => {
    if (platform) {
      localStorage.setItem("platform", platform);
    } else {
      localStorage.setItem("platform", "");
    }
  }, [platform]);

  console.log(boards);
  return (
    <MyContext.Provider
      value={{
        boards,
        setBoards,
        theme,
        platform,
        setPlatform,
        boardMenu,
        setBoardMenu,
        isDark,
        setIsDark,
        isTaskDetails,
        setIsTaskDetails,
        taskDetails,
        setTaskDetails,
        isAddTask,
        setIsAddTask,
        isEditTask,
        setIsEditTask,
        isTaskDelete,
        setIsTaskDelete,
        isBoardDelete,
        setIsBoardDelete,
      }}
    >
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <GlobalStyle
        isDark={isDark}
        boardMenu={boardMenu}
        isTaskDetails={isTaskDetails}
        isAddTask={isAddTask}
        isEditTask={isEditTask}
        isTaskDelete={isTaskDelete}
        isBoardDelete={isBoardDelete}
      />
      {(boardMenu ||
        isTaskDetails ||
        isAddTask ||
        isEditTask ||
        isTaskDelete ||
        isBoardDelete) && (
        <BlackScreen
          onClick={() => {
            setBoardMenu(false);
            setIsTaskDetails(false);
            setIsAddTask(false);
          }}
        />
      )}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/:platform" element={<Board />} />
          <Route path="/" element={<Add />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
