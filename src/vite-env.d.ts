/// <reference types="vite/client" />

export interface ContextProps {
  boards: Platform[];
  setBoards: (boards: Platform[]) => void;
  theme: ThemeType;
  platform: string | undefined;
  setPlatform: (platform: string | undefined) => void;
  boardMenu: boolean;
  setBoardMenu: (boardMenu: boolean) => void;
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  isTaskDetails: boolean;
  setIsTaskDetails: (isDark: boolean) => void;
  taskDetails: Task | undefined;
  setTaskDetails: (taskDetails: Task | undefined) => void;
  isAddTask: Boolean;
  setIsAddTask: (isAddTask: Boolean) => void;
  isEditTask: Boolean;
  setIsEditTask: (isEditTask: Boolean) => void;
  isTaskDelete: Boolean;
  setIsTaskDelete: (isTaskDelete: Boolean) => void;
  isBoardDelete: Boolean;
  setIsBoardDelete: (isBoardDelete: Boolean) => void;
  isNewBoard: Boolean;
  setIsNewBoard: (isNewBoard: Boolean) => void;
  isEditBoard: Boolean;
  setIsEditBoard: (isEditBoard: Boolean) => void;
  isMore: Boolean;
  setIsMore: (isMore: Boolean) => void;
}

interface Task {
  title: string;
  description: string;
  completed?: number;
  status: string;
  subtasks: SubTask[];
  task?: any;
}

interface SubTask {
  title: string;
  isCompleted: boolean;
  id?: number;
}

interface Column {
  name: string;
  color?: string;
  tasks: Task[];
}

interface Platform {
  name: string;
  slug: any;
  columns: Column[];
}

interface ThemeType {
  dark: {
    veryDarkGrey: string;
    darkGrey: string;
    mediumGrey: string;
    white: string;
  };

  light: {
    lightGrey: string;
    white: string;
    black: string;
  };
}
