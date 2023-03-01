import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { MyContext } from "../App";
import AddTask from "../components/AddTask";
import BoardMenu from "../components/BoardMenu";
import EditTask from "../components/EditTask";
import TaskDetails from "../components/TaskDetails";
import { BlackScreen, StyledButton, theme } from "../styled-components";
import { ThemeType } from "../vite-env";
import TaskDelete from "../components/TaskDelete";
import BoardDelete from "../components/BoardDelete";
import AddBoard from "../components/AddBoard";
import EditBoard from "../components/EditBoard";

export default function Board() {
  const COLORS = [
    "#49C4E5",
    "#8471F2",
    "#67E2AE",
    "#FF8C00",
    "#4B0082",
    "#FF1493",
    "#DAA520",
    "#00FA9A",
    "#FF6347",
    "#00BFFF",
    "#8B0000",
    "#6A5ACD",
    "#2E8B57",
    "#FFD700",
    "#F08080",
    "#778899",
    "#B22222",
    "#008080",
    "#FFA07A",
    "#FF00FF",
  ];

  const [column, setColumn] = useState<number>(0);
  const [taskIndex, setTaskIndex] = useState<number>(0);
  const context = useContext(MyContext);
  const params = useParams();
  //find platform
  const platform = context?.boards?.find(
    (item) => item.slug == params.platform
  );

  //find platform index
  let platformIndex = 0;
  context?.boards.map((item, index) => {
    if (item.slug == params.platform) {
      platformIndex = index;
    }
  });
  useEffect(() => {
    const clone = context?.boards;
    clone?.[platformIndex].columns.map((item) => {
      item.tasks.map((item2) => {
        if (item.name != item2.status) {
          clone[platformIndex].columns[
            clone[platformIndex].columns.indexOf(item)
          ].tasks.splice(
            clone[platformIndex].columns[
              clone[platformIndex].columns.indexOf(item)
            ].tasks.indexOf(item2),
            1
          );
          clone?.[platformIndex].columns
            .find((item) => (item.name == item2.status))
            ?.tasks.push(item2);
        }
      });
      context?.setBoards([...clone]);
      console.log(context?.boards);
    });
  }, [context?.isEditTask]);
  //set random color circles for each column
  platform?.columns?.map((item, index) => {
    item.color = COLORS[index];
    item.tasks.map((item2) => {
      item2.completed = 0;
      item2.subtasks.map((item3) => {
        if (item3.isCompleted == true && item2.completed != undefined) {
          item2.completed++;
        }
      });
    });
  });
  console.log(context?.boards);
  return (
    <BoardWrapper isDark={context?.isDark} theme={context?.theme}>
      {context?.boardMenu && <BoardMenu />}
      {context?.isAddTask && <AddTask platformIndex={platformIndex} />}
      {context?.isEditTask && (
        <EditTask
          platformIndex={platformIndex}
          task={context.taskDetails}
          column={column}
          taskIndex={taskIndex}
        />
      )}
      {context?.isTaskDelete && (
        <TaskDelete
          taskName={context.taskDetails?.title}
          platformIndex={platformIndex}
          column={column}
          taskIndex={taskIndex}
        />
      )}
      {context?.isNewBoard && <AddBoard />}
      {context?.isEditBoard && (
        <EditBoard
          platformIndex={platformIndex}
          task={context.taskDetails}
          column={column}
          taskIndex={taskIndex}
        />
      )}

      {platform?.columns.length == 0 && (
        <div className="first-column">
          <h2>This board is empty. Create a new column to get started.</h2>
          <StyledButton>+ Add New Column</StyledButton>
        </div>
      )}

      <div className="main">
        {platform?.columns.map((column: any, index) => {
          column.id = (Math.random() * 100000).toFixed(0);
          return (
            <div className="column" key={Math.random()}>
              <div className="for-flex">
                <StyledCircle
                  className="circle"
                  randomColor={column.color}
                ></StyledCircle>
                <h2>
                  {column.name} ({column.tasks.length})
                </h2>
              </div>
              {column.tasks.map((task: any, index2: any) => {
                return (
                  <div
                    key={Math.random()}
                    className="task"
                    onClick={() => {
                      context?.setIsTaskDetails(true);
                      context?.setTaskDetails(task);
                      setColumn(index);
                      setTaskIndex(index2);
                    }}
                  >
                    <h3>{task.title}</h3>
                    <p>
                      {task.completed} of {task.subtasks.length} substasks
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}

        {context?.boards[platformIndex].columns.length != 0 && (
          <div className="add-column">
            <h2>+ New Column</h2>
          </div>
        )}
      </div>
      {context?.isTaskDetails && (
        <TaskDetails
          platformIndex={platformIndex}
          column={column}
          taskIndex={taskIndex}
          task={context.taskDetails}
        />
      )}
      {context?.isBoardDelete && (
        <BoardDelete
          platformName={context.boards[platformIndex].name}
          platformIndex={platformIndex}
        />
      )}
    </BoardWrapper>
  );
}

const BoardWrapper = styled.div<{
  isDark: Boolean | undefined;
  theme: ThemeType;
}>`
  box-sizing: border-box;

  .first-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    margin-top: 50%;

    h2 {
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 23px;
      text-align: center;
      color: #828fa3;
      width: 343px;
    }

    button {
      height: 48px;
    }
  }

  .main {
    display: flex;
    gap: 24px;
    padding: 24px 16px;
    height: 100%;
    overflow: auto;
    .for-flex {
      display: flex;
      gap: 12px;
      width: 344px;
      h2 {
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 2.4px;
        color: #828fa3;
        display: inline-block;
      }
    }

    .column {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 344px;
      .task {
        width: 280px;
        padding: 23px 16px;
        border-radius: 8px;
        background-color: ${(props) =>
          props.isDark == true ? theme.dark.darkGrey : theme.light.white};

        h3 {
          font-weight: 700;
          font-size: 15px;
          line-height: 19px;
          color: ${(props) =>
            props.isDark == true ? theme.dark.white : theme.light.black};
        }

        p {
          color: #828fa3;
          font-weight: 700;
          font-size: 12px;
          line-height: 15px;
          margin-top: 8px;
        }
      }
    }

    .add-column {
      background: ${(props) =>
        props.isDark == true
          ? "linear-gradient( 180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.125) 100%)"
          : "linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.5) 100%);"};
      display: flex;
      align-items: center;
      margin-top: 35px;
      border-radius: 6px;
      h2 {
        padding: 20px 55.5px;
        width: 169px;
        font-weight: 700;
        font-size: 24px;
        line-height: 30px;
        text-align: center;
        color: #828fa3;
      }
    }
  }
`;

const StyledCircle = styled.div<{ randomColor: any }>`
  background-color: ${(props) => props.randomColor};
  width: 15px;
  height: 15px;
  border-radius: 100%;
`;
