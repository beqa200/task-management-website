import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { MyContext } from "../App";
import { deleteIcon } from "../assets";
import {
  DescriptionInput,
  SelectInput,
  StyledButton,
  StyledLabel,
  StyledWhiteButton,
  SubTaskInput,
  TitleInput,
} from "../styled-components";
import { ThemeType } from "../vite-env";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function AddBoard(this: any) {
  const context = useContext(MyContext);

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

const navigate = useNavigate();
  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm<any>({ mode: "all" });

  const [newBoard, setNewBoard] = useState({
    name: "",
    slug: "",
    columns: [
      {
        name: "",
        tasks: [],
        id: (Math.random() * 100000).toFixed(0),

      },
    ],
  });

  const addColumn = () => {
    console.log("Sds")
    const clone = newBoard;
    clone.columns.push({
      name: "",
      tasks: [],
      id: (Math.random() * 100000).toFixed(0),
    });
    setNewBoard({...clone});
  };
  const onSubmit = (data: any) => {
    const clone: any = context?.boards;
    clone.push(newBoard);
    context?.setBoards(clone);

    context?.setIsNewBoard(false);
    context?.setPlatform(data.name)
    navigate(`/${data.name}`)
  };
  return (
    <AddBoardWrapper theme={context?.theme} isDark={context?.isDark}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Add New Board</h1>
        <div className="input-div">
          <StyledLabel>Board Name</StyledLabel>
          <TitleInput
            style={
              errors.name != undefined
                ? { border: "1px solid #EA5555" }
                : { border: "" }
            }
            placeholder="e.g. Web Design"
            {...register("name", {
              required: { value: true, message: "Can’t be empty" },
            })}
            onChange={(e) => {
              const clone = {...newBoard};
              clone.name = e.target.value;
              clone.slug = e.target.value.toLocaleLowerCase().replace(" ", "-");
              setNewBoard(clone);
            }}
          />
          {errors.name?.message && <p style={{width: "96px", left: "60%"}}>Can’t be empty</p>}
        </div>
          <div className="input-div">
            <StyledLabel>Board Columns</StyledLabel>
            <div
              style={{
                marginBottom: "12px",
                maxHeight: "150px",
                overflowY: "auto",
              }}
            >
              {newBoard.columns.map((item: any, index) => {
                item.color = COLORS[index];
                {
                    return ( <div className="item">
                  <SubTaskInput
                    style={
                      errors[`column${item.id}`] != undefined
                        ? { border: "1px solid #EA5555" }
                        : { border: "" }
                    }
                    placeholder="e.g. Todo"
                    {...register(`column${item.id}`, {
                      required: { value: true, message: "Can’t be empty" },
                    })}
                    onChange={(e) => {
                      const clone = newBoard;
                      clone.columns[index].name = e.target.value;
                      setNewBoard(clone);
                    }}
                  />
                  <img src={deleteIcon} />
                  {errors[`column${item.id}`]?.message && <p>Can’t be empty</p>}
                </div>)}
})}
            </div>
          </div>
          <StyledWhiteButton className="addButon" onClick={addColumn}>
            + Add New Column
          </StyledWhiteButton>
      

        <StyledButton
          style={{ height: "40px", width: "100%", marginTop: "24px" }}
          type="submit"
        >
          Create New Board
        </StyledButton>
      </form>
    </AddBoardWrapper>
  );
}

const AddBoardWrapper = styled.div<{
  isDark: Boolean | undefined;
  theme: ThemeType;
}>`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) =>
    props.isDark == true ? props.theme.dark.darkGrey : props.theme.light.white};
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
      props.isDark == true ? props.theme.dark.white : props.theme.light.black};
  }

  input,
  textarea {
    color: ${(props) =>
      props.isDark == true ? props.theme.light.white : props.theme.light.black};
    margin-top: 8px;
  }

  .input-div {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    position: relative;
    label {
      color: ${(props) =>
        props.isDark == true
          ? props.theme.light.white
          : props.theme.light.black};
    }

    .item {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: center;
      position: relative;
      img {
        object-fit: none;
        margin-top: 8px;
      }
    }

    .addButton {
      background-color: ${(props) =>
        props.isDark == true
          ? props.theme.light.white
          : "rgba(99, 95, 199, 0.1)"};
    }

    select {
      color: ${(props) =>
        props.isDark == true
          ? props.theme.light.white
          : props.theme.light.black};
      option {
        background-color: ${(props) =>
          props.isDark == true
            ? props.theme.dark.veryDarkGrey
            : props.theme.light.lightGrey};
        color: ${(props) =>
          props.isDark == true
            ? props.theme.light.white
            : props.theme.light.black};
      }
    }

    p {
      position: absolute;
      font-weight: 500;
      font-size: 13px;
      line-height: 23px;
      color: #ea5555;
      left: 50%;
      bottom: 9px;
    }
  }
`;
