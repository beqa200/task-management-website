import React, { useContext, useState } from "react";
import styled, { ThemeProps } from "styled-components";
import { MyContext } from "../App";
import { arrowDown, verticalEllipsis } from "../assets";
import { theme } from "../styled-components";
import { ContextProps, SubTask, Task, ThemeType } from "../vite-env";

export default function TaskDetails(props: {
  task: Task | undefined;
  platformIndex: number;
  column: number;
  taskIndex: number;
}) {
  const context = useContext(MyContext);

  //change checkbox value and update whole state
  const toggleSubtaskCompleted = (subtaskId: any) => {
    props.task?.subtasks?.map((subtask) => {
      if (subtask.id === subtaskId) {
        const clone: any = context?.boards;
        clone[props.platformIndex].columns[props.column].tasks[
          props.taskIndex
        ].subtasks[subtaskId].isCompleted =
          !clone?.[props.platformIndex].columns[props.column].tasks[
            props.taskIndex
          ].subtasks[subtaskId].isCompleted;
        context?.setBoards([...clone]);
      }
    });
  };

  const handleSelectOption = (value: any) => {
    const clone: any = context?.boards;
    const newColumn = clone[props.platformIndex].columns.find(
      (column: any) => column.name == value
    );
    console.log(newColumn);
    newColumn.tasks.push(props.task);
    delete clone[props.platformIndex].columns[props.column].tasks[
      props.taskIndex
    ];
    context?.setIsTaskDetails(false);
    context?.setBoards([...clone]);
  };

  return (
    <TaskDetailsWrapper theme={context?.theme} isDark={context?.isDark}>
      <div className="for-flex">
        <h1>{props.task?.title}</h1>
        <img className="more" src={verticalEllipsis} />
      </div>

      <p className="description">{props.task?.description}</p>
      <div className="subtasks">
        <p className="subs">
          Subtasks ({props.task?.completed} of {props.task?.subtasks.length})
        </p>
        <div className="list">
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
                <label
                  style={
                    task.isCompleted == true
                      ? { opacity: 0.5, textDecoration: "line-through" }
                      : { opacity: 1, textDecoration: "none" }
                  }
                >
                  {task.title}
                </label>
              </div>
            );
          })}
        </div>
        <div className="status">
          <label>Current Status</label>
          <select
            onChange={(e) => handleSelectOption(e.target.value)}
            value={
              context?.boards[props.platformIndex].columns[props.column].name
            }
          >
            {context?.boards[props.platformIndex].columns.map((column) => (
              <option value={column.name}>{column.name}</option>
            ))}
          </select>
        </div>
      </div>
    </TaskDetailsWrapper>
  );
}

const TaskDetailsWrapper = styled.div<{
  isDark: Boolean | undefined;
  theme: ThemeType;
}>`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) =>
    props.isDark == true ? theme.dark.darkGrey : theme.light.white};
  width: calc(90% - 48px);
  max-width: 416px;
  padding: 24px 24px 32px 24px;
  border-radius: 6px;

  h1 {
    font-weight: 700;
    font-size: 18px;
    line-height: 23px;
    width: 95%;
    color: ${(props) =>
      props.isDark == true ? theme.dark.white : theme.light.black};
  }

  .for-flex {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .description {
    font-weight: 500;
    font-size: 13px;
    line-height: 23px;
    color: ${theme.dark.mediumGrey};
    margin-top: 24px;
  }

  .subs {
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;
    color: ${(props) =>
      props.isDark == true ? theme.light.white : theme.dark.mediumGrey};
  }

  .list {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    div {
      width: calc(100% - 24px);
      background-color: ${(props) =>
        props.isDark == true ? theme.dark.veryDarkGrey : theme.light.lightGrey};
      padding: 22px 12px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      gap: 16px;
      input {
        accent-color: #635fc7;
      }

      label {
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        text-decoration-line: line-through;
        color: ${(props) =>
          props.isDark == true ? theme.light.white : theme.light.black};
        mix-blend-mode: normal;
        opacity: 0.5;
      }
    }
  }

  .status {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    label {
      font-size: 12px;
      line-height: 15px;
      color: ${(props) =>
        props.isDark == true ? theme.light.white : theme.dark.mediumGrey};
    }

    select {
      margin-top: 8px;
      padding: 8px 16px;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url(${arrowDown});
      background-repeat: no-repeat;
      background-position: right 15px center;
      border: 1px solid rgba(130, 143, 163, 0.25);
      border-radius: 4px;
      background-color: transparent;
      color: ${(props) =>
        props.isDark == true ? theme.light.white : theme.light.black};

      option {
        background-color: ${(props) =>
          props.isDark == true
            ? theme.dark.veryDarkGrey
            : theme.light.lightGrey};
        color: ${(props) =>
          props.isDark == true ? theme.light.white : theme.light.black};
      }
    }
  }
`;
