import React, { useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { MyContext } from "../App";
import BoardMenu from "../components/BoardMenu";
import { BlackScreen, StyledButton, theme } from "../styled-components";
import { ThemeType } from "../vite-env";
export default function Board() {
  const params = useParams();
  const context = useContext(MyContext);
  let completed = 0;
  const platform = context?.boards?.find(
    (item) => item.name == context.platform
  );

  platform?.columns.map((item) => {
    item.tasks.map((item2) => {
      item2.completed = 0;

      item2.subtasks.map((item3) => {
        if (item3.isCompleted == true && item2.completed != undefined) {
          item2.completed++;
        }
      });
    });
  });

  return (
    <BoardWrapper isDark={context?.isDark} theme={context?.theme}>
      {context?.boardMenu && <BoardMenu />}
      {context?.boardMenu && (
        <BlackScreen
          onClick={() => {
            context?.setBoardMenu(false);
          }}
        />
      )}

      {platform?.columns.length == 0 && (
        <div className="first-column">
          <h2>This board is empty. Create a new column to get started.</h2>
          <StyledButton>+ Add New Column</StyledButton>
        </div>
      )}

      <div className="main">
        {platform?.columns.map((column) => (
          <div className="column" key={Math.random()}>
            <h2>
              {column.name} ({column.tasks.length})
            </h2>
            {column.tasks.map((task) => {
              return (
                <div key={Math.random()} className="task">
                  <h3>{task.title}</h3>
                  <p>
                    {task.completed} of {task.subtasks.length} substasks
                  </p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
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
    margin: 0 16px;
  width: 100%;

    h2 {

    }
    
    .column {
      display: flex;
      flex-direction: column;
      gap: 20px;
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
  }
`;
