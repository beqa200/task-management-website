import React, { useContext, useEffect, useState } from "react";
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
import { Task, ThemeType } from "../vite-env";
import { useForm } from "react-hook-form";
import { AddTaskWrapper } from "./AddTask";

export default function EditTask(props: {
  platformIndex: number;
  task: any;
  column: number;
  taskIndex: number;
}) {
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

  useEffect(() => {
    setValue("title", props.task?.title);
    setValue("description", props.task?.description);
    props.task?.subtasks.map((item: any, index: number) =>
      setValue(`subtask${item.id}`, item.title)
    );
    setValue("status", props.task?.status);
  }, []);
  console.log(
    context?.boards[props.platformIndex].columns[props.column].tasks[
      props.taskIndex
    ].subtasks
  );

  const addSubTask = () => {
    const clone: any = context?.boards;
    clone?.[props.platformIndex].columns[props.column].tasks[
      props.taskIndex
    ].subtasks.push({
      title: "",
      isCompleted: false,
      id: (Math.random() * 100000).toFixed(0),
    });
    context?.setBoards([...clone]);
  };
  const onSubmit = (data: any) => {
    if (props.task?.subtasks.every((obj: any) => obj.title !== "")) {
      context?.setIsEditTask(false);
    }
  };

  console.log(errors);

  return (
    <AddTaskWrapper theme={context?.theme} isDark={context?.isDark}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Edit Task</h1>
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
            <p style={{ left: "65%" }}>Can’t be empty</p>
          )}
        </div>
        <div className="input-div">
          <StyledLabel>Description</StyledLabel>
          <DescriptionInput
            placeholder="e.g. It’s always good to take a break. This 
15 minute break will  recharge the batteries 
a little."
            value={props.task?.description}
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
            {props.task?.subtasks.map((item: any, index: number) => {
              {
                return (
                  <div className="item">
                    <SubTaskInput
                      placeholder="e.g. Make coffee"
                      style={
                        errors[`subtask${item.id}`] != undefined
                          ? { border: "1px solid #EA5555" }
                          : { border: "" }
                      }
                      {...register(`subtask${item.id}`, {
                        required: { value: true, message: "Can’t be empty" },
                      })}
                      onChange={(e) => {
                        const clone: any = context?.boards;
                        clone[props.platformIndex].columns[props.column].tasks[
                          clone?.[props.platformIndex].columns[
                            props.column
                          ].tasks.indexOf(props.task)
                        ].subtasks[index].title = e.target.value;
                        context?.setBoards([...clone]);
                        clearErrors(`subtask${item.id}`);
                      }}
                    />
                    <img
                      src={deleteIcon}
                      onClick={() => {
                        const clone: any = context?.boards;
                        clone[props.platformIndex].columns[props.column].tasks[
                          props.taskIndex
                        ].subtasks.splice(index, 1);
                        context?.setBoards([...clone]);
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
