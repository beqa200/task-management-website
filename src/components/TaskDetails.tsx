import React, { useContext, useState } from "react";
import styled from "styled-components";
import { MyContext } from "../App";
import { verticalEllipsis } from "../assets";
import { SelectInput, StyledLabel, theme } from "../styled-components";
import { Task, ThemeType } from "../vite-env";

export default function TaskDetails(props: {
  task: Task | undefined;
  platformIndex: number;
  column: number;
  taskIndex: number;
}) {
  const context = useContext(MyContext);
  const [isMore, setIsMore] = useState(false);

  const toggleSubtaskCompleted = (subtaskId: any) => {
    props.task?.subtasks?.map((subtask) => {
      if (subtask.id === subtaskId) {
        const clone: any = context?.boards;
        clone[props.platformIndex].columns[props.column].tasks[
          props.taskIndex
        ].subtasks[
          clone[props.platformIndex].columns[props.column].tasks[
            props.taskIndex
          ].subtasks.indexOf(subtask)
        ].isCompleted =
          !clone?.[props.platformIndex].columns[props.column].tasks[
            props.taskIndex
          ].subtasks[
            clone[props.platformIndex].columns[props.column].tasks[
              props.taskIndex
            ].subtasks.indexOf(subtask)
          ].isCompleted;
        localStorage.setItem("storedBoards", JSON.stringify(clone));
        context?.setBoards([...clone]);
      }
    });
  };

  const handleSelectOption = (value: any) => {
    const clone: any = context?.boards;
    const newColumn = clone[props.platformIndex].columns.find(
      (column: any) => column.name == value
    );
    newColumn.tasks.push(props.task);
    clone[props.platformIndex].columns[props.column].tasks.splice(
      props.taskIndex,
      1
    );
    if (props.task) {
      props.task.status = value;
    }
    context?.setIsTaskDetails(false);
    localStorage.setItem("storedBoards", JSON.stringify(clone));
    context?.setBoards([...clone]);
  };

  return (
    <TaskDetailsWrapper theme={context?.theme} isDark={context?.isDark}>
      {isMore && (
        <div className="more">
          <p
            className="edit"
            onClick={() => {
              context?.setIsTaskDetails(false), context?.setIsEditTask(true);
            }}
          >
            Edit Task
          </p>
          <p
            className="delete"
            onClick={() => {
              context?.setIsTaskDetails(false);
              context?.setIsTaskDelete(true);
            }}
          >
            Delete Task
          </p>
        </div>
      )}
      <div className="for-flex">
        <h1>{props.task?.title}</h1>
        <img
          className="more-img"
          src={verticalEllipsis}
          onClick={() => {
            setIsMore(!isMore);
          }}
        />
      </div>

      <p
        className="description"
        onClick={() => {
          setIsMore(false);
        }}
      >
        {props.task?.description}
      </p>
      <div
        className="subtasks"
        onClick={() => {
          setIsMore(false);
        }}
      >
        <p className="subs">
          Subtasks ({props.task?.completed} of {props.task?.subtasks.length})
        </p>
        <div className="list">
          {props.task?.subtasks.map((task: any) => {
            task.id = (Math.random() * 100000).toFixed(0);
            return (
              <div key={Math.random()}>
                <input
                  type="checkbox"
                  value={task.id}
                  checked={task.isCompleted}
                  onChange={() => toggleSubtaskCompleted(task.id)}
                />
                <StyledLabel
                  style={
                    task.isCompleted == true
                      ? { opacity: 0.5, textDecoration: "line-through" }
                      : { opacity: 1, textDecoration: "none" }
                  }
                >
                  {task.title}
                </StyledLabel>
              </div>
            );
          })}
        </div>
        <div className="status">
          <StyledLabel>Current Status</StyledLabel>
          <SelectInput
            onChange={(e) => handleSelectOption(e.target.value)}
            value={
              context?.boards[props.platformIndex].columns[props.column].name
            }
          >
            {context?.boards[props.platformIndex].columns.map((column) => (
              <option value={column.name} key={Math.random()}>
                {column.name}
              </option>
            ))}
          </SelectInput>
        </div>
      </div>
    </TaskDetailsWrapper>
  );
}

const TaskDetailsWrapper = styled.div<{
  isDark: Boolean | undefined;
  theme: ThemeType;
}>`
  position: fixed;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) =>
    props.isDark == true ? theme.dark.darkGrey : theme.light.white};
  transition: 1s;

  width: calc(90% - 48px);
  max-width: 432px;
  padding: 24px 24px 32px 24px;
  border-radius: 6px;

  .more {
    background-color: ${(props) =>
      props.isDark == true ? theme.dark.darkGrey : theme.light.white};
    transition: 1s;
    position: absolute;
    padding: 16px;
    box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25);
    border-radius: 8px;
    right: -15px;
    top: 60px;
    z-index: 10;

    p {
      font-weight: 500;
      font-size: 13px;
      line-height: 23px;
      color: #828fa3;
      width: 160px;

      &:hover {
        @media (min-width: 1440px) {
          cursor: pointer;
          opacity: 0.7;
        }
      }
    }

    .delete {
      color: #ea5555;
      margin-top: 16px;
    }
  }

  h1 {
    font-weight: 700;
    font-size: 18px;
    line-height: 23px;
    width: 95%;
    color: ${(props) =>
      props.isDark == true ? theme.dark.white : theme.light.black};
    transition: 1s;
  }

  .for-flex {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .more-img {
    object-fit: none;
    margin-right: -5px;
    padding: 5px;

    &:hover {
      @media (min-width: 1440px) {
        cursor: pointer;
      }
    }
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
    margin-top: 24px;
    color: ${(props) =>
      props.isDark == true ? theme.light.white : theme.dark.mediumGrey};
  }

  .list {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 290px;
    overflow-y: auto;
    div {
      width: calc(100% - 24px);
      background-color: ${(props) =>
        props.isDark == true ? theme.dark.veryDarkGrey : theme.light.lightGrey};
      transition: 1s;
      padding: 22px 12px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      gap: 16px;

      &:hover {
        @media (min-width: 1440px) {
          cursor: pointer;
        }
      }

      input {
        accent-color: #635fc7;
      }

      label {
        color: ${(props) =>
          props.isDark == true ? theme.light.white : theme.light.black};
        transition: 1s;

        &:hover {
          @media (min-width: 1440px) {
            cursor: pointer;
          }
        }
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
      transition: 1s;
    }

    select {
      &:hover {
        @media (min-width: 1440px) {
          cursor: pointer;
        }
      }
      color: ${(props) =>
        props.isDark == true ? theme.light.white : theme.light.black};
      transition: 1s;

      option {
        background-color: ${(props) =>
          props.isDark == true
            ? theme.dark.veryDarkGrey
            : theme.light.lightGrey};
        color: ${(props) =>
          props.isDark == true ? theme.light.white : theme.light.black};
        transition: 1s;
      }
    }
  }
`;
