import React, { useContext, useState } from "react";
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

export default function AddTask(props: { platformIndex: number }) {
  const context = useContext(MyContext);

  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm<any>({ mode: "all" });

  console.log(watch("description"));

  const [subTasks, setSubTasks] = useState([
    { title: "", isCompleted: false, id: (Math.random() * 100000).toFixed(0) },
    { title: "", isCompleted: false, id: (Math.random() * 100000).toFixed(0) },
  ]);

  const addSubTask = () => {
    const clone: any = [...subTasks];
    setSubTasks([
      ...clone,
      {
        title: "",
        isCompleted: false,
        id: (Math.random() * 100000).toFixed(0),
      },
    ]);
  };
console.log(errors);
  const onSubmit = (data: any) => {
    if (subTasks.every((obj: any) => obj.title !== "")) {
      const newTask: any = {
        title: "",
        description: "",
        subtasks: [],
        status: "",
      };

      newTask.title = data.title;
      newTask.description = data.description;
      newTask.subtasks = subTasks;
      newTask.status = data.status;

      const bigClone: any = context?.boards;

      bigClone?.[props.platformIndex].columns
        .find((item: any) => item.name == data.status)
        ?.tasks.push(newTask);

      context?.setBoards(bigClone);

      context?.setIsAddTask(false);
    }
  };

  return (
    <AddTaskWrapper theme={context?.theme} isDark={context?.isDark}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Add New Task</h1>
        <div className="input-div">
          <StyledLabel>Title</StyledLabel>
          <TitleInput
            placeholder="e.g. Take coffee break"
            style={
              errors.title != undefined
                ? { border: "1px solid #EA5555" }
                : { border: "" }
            }
            {...register("title", {
              required: { value: true, message: "Can’t be empty" },
            })}
          />
          {errors.title?.message && (
            <p style={{ left: "60%" }}>Can’t be empty</p>
          )}
        </div>
        <div className="input-div">
          <StyledLabel>Description</StyledLabel>
          <DescriptionInput
            placeholder="e.g. It’s always good to take a break. This 
15 minute break will  recharge the batteries 
a little."
            {...register("description")}
          />
        </div>
        <div className="input-div">
          <StyledLabel>Subtasks</StyledLabel>
          <div
            style={{
              marginBottom: "12px",
              maxHeight: "150px",
              overflowY: "auto",
            }}
          >
            {subTasks.map((item) => {
              console.log(errors[`subtask${item.id}`]);
              {
                return (
                  <div className="item">
                    <SubTaskInput
                      placeholder="e.g. Make coffee"
                      value={item.title}
                      style={
                        errors[`subtask${item.id}`] != undefined
                          ? { border: "1px solid #EA5555" }
                          : { border: "" }
                      }
                      {...register(`subtask${item.id}`, {
                        required: { value: true, message: "Can’t be empty" },
                      })}
                      onChange={(e) => {
                        const clone = [...subTasks];
                        clone[clone.indexOf(item)].title = e.target.value;
                        setSubTasks(clone);
                        clearErrors(`subtask${item.id}`);
                      }}
                    />
                    <img
                      src={deleteIcon}
                      onClick={() => {
                        const clone = [...subTasks];
                        clone.splice(clone.indexOf(item), 1);
                        setSubTasks(clone);
                      }}
                    />
                    {errors[`subtask${item.id}`]?.message && (
                      <p>Can’t be empty</p>
                    )}
                  </div>
                );
              }
            })}
          </div>
          <StyledWhiteButton className="addButon" onClick={addSubTask}>
            + Add New Subtask
          </StyledWhiteButton>
        </div>
        <div className="input-div">
          <SelectInput {...register("status")}>
            {context?.boards[props.platformIndex].columns.map((column) => (
              <option value={column.name}>{column.name}</option>
            ))}
          </SelectInput>
        </div>
        <StyledButton
          style={{ height: "40px", width: "100%", marginTop: "24px" }}
          type="submit"
        >
          Create Task
        </StyledButton>
      </form>
    </AddTaskWrapper>
  );
}

export const AddTaskWrapper = styled.div<{
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

    .addButon {
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
