/// <reference types="vite/client" />

export interface ContextProps {
  boards: Platform[] | null;
  theme: ThemeType;
  platform: string | undefined;
  setPlatform: (platform: string | undefined) => void;
  boardMenu: boolean;
  setBoardMenu: (boardMenu: boolean) => void;
}

interface Task {
  title: string;
  description: string;
  status: string;
  subTasks?: SubTask[];
}

interface SubTask {
  title: string;
  isCompleted: boolean;
}

interface Column {
  name: string;
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
    headerColor: string;
    headerText: string;
  };
}
