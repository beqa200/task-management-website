import React, { useContext, useState } from "react";
import styled, { ThemeProps } from "styled-components";
import { MyContext } from "../App";
import { theme } from "../styled-components";
import { ContextProps, SubTask, Task, ThemeType } from "../vite-env";

export default function TaskDetails(props: { task: Task | undefined; platformIndex: number; column: number; taskIndex: number }) {
  const context = useContext(MyContext);
  
  const toggleSubtaskCompleted = (subtaskId: any) => {
  
    props.task?.subtasks?.map((subtask) => {
      if (subtask.id === subtaskId) {
        console.log(props.task?.subtasks);
       const clone: any = context?.boards;
       clone[props.platformIndex].columns[props.column].tasks[props.taskIndex].subtasks[subtaskId].isCompleted = !clone?.[props.platformIndex].columns[props.column].tasks[props.taskIndex].subtasks[subtaskId].isCompleted;
       context?.setBoards([...clone]);
      }
     
    });

    
  };

  return (
    <TaskDetailsWrapper theme={context?.theme} isDark={context?.isDark}>
      <h1>{props.task?.title}</h1>
      <p>{props.task?.description}</p>
      <div className="subtasks">
        <p>
          Subtasks ({props.task?.completed} of {props.task?.subtasks.length})
        </p>
        {props.task?.subtasks.map((task, index) => {
          task.id = index;
          return (
            <div>
              <input
                type="checkbox"
                value={task.id}
                checked={task.isCompleted}
                onChange={() => toggleSubtaskCompleted(task.id)}
              />
              {task.title}
            </div>
          );
        })}
      </div>
    </TaskDetailsWrapper>
  );
}

const TaskDetailsWrapper = styled.div<{
  isDark: Boolean | undefined;
  theme: ThemeType;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) =>
    props.isDark == true ? theme.dark.darkGrey : theme.light.white};
  width: 90%;
  max-width: 480px;
`;
