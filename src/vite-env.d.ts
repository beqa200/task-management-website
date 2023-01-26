/// <reference types="vite/client" />

export interface ContextProps {
  boards: Platform[] | null;
  theme: ThemeType;
  platform: string | undefined;
  setPlatform: (platform: string | undefined) => void;
  boardMenu: boolean;
  setBoardMenu: (boardMenu: boolean) => void;
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

interface Task {
  title: string;
  description: string;
  completed?: number;
  totalsubs?: number;
  status: string;
  subtasks: SubTask[];
}

interface SubTask {
  title: string;
  isCompleted: boolean;
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
    backgroundColor: string;
    darkGrey: string;
    white: string;
  };

  light: {
    backgroundColor: string;
    white: string;
    black: string;
  };
}
