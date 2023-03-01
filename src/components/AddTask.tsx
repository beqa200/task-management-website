import React, { useContext, useState } from "react";
import { MyContext } from "../App";
import { deleteIcon } from "../assets";
import {
  DescriptionInput,
  FormWrapper,
  SelectInput,
  StyledButton,
  StyledLabel,
  StyledWhiteButton,
  SubTaskInput,
  TitleInput,
} from "../styled-components";
import { useForm } from "react-hook-form";

export default function AddTask(props: { platformIndex: number }) {
  const context = useContext(MyContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<any>({ mode: "all" });

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
    <FormWrapper theme={context?.theme} isDark={context?.isDark}>
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
              {
                return (
                  <div className="item" key={Math.random()}>
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
          <StyledWhiteButton className="addButton" onClick={addSubTask}>
            + Add New Subtask
          </StyledWhiteButton>
        </div>
        <div className="input-div">
          <SelectInput {...register("status")}>
            {context?.boards[props.platformIndex].columns.map((column) => (
              <option value={column.name} key={Math.random()}>
                {column.name}
              </option>
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
    </FormWrapper>
  );
}
