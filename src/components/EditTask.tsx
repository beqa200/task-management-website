import React, { useContext, useEffect, useState } from "react";
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

  const [newTask, setNewTask] = useState(props.task);
  useEffect(() => {
    setValue("title", props.task?.title);
    setValue("description", props.task?.description);
    props.task?.subtasks.map((item: any, index: number) =>
      setValue(`subtask${item.id}`, item.title)
    );
    setValue("status", props.task?.status);
  }, []);

  const addSubTask = () => {
    const clone: any = newTask;
    clone?.subtasks.push({
      title: "",
      isCompleted: false,
      id: (Math.random() * 100000).toFixed(0),
    });
    setNewTask({ ...clone });
  };
  const onSubmit = () => {
    if (props.task?.subtasks.every((obj: any) => obj.title !== "")) {
      const clone: any = context?.boards;
      if (clone) {
        clone[props.platformIndex].columns[props.column].tasks[
          props.taskIndex
        ] = newTask;
      }
      context?.setBoards([...clone]);
      context?.setIsEditTask(false);
    }
  };

  return (
    <FormWrapper theme={context?.theme} isDark={context?.isDark}>
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
            onChange={(e) => {
              const clone = { ...newTask };
              clone.title = e.target.value;
              setNewTask(clone);
            }}
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
            onChange={(e) => {
              const clone = { ...newTask };
              clone.description = e.target.value;
              setNewTask(clone);
            }}
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
            {newTask.subtasks.map((item: any, index: number) => {
              {
                return (
                  <div className="item" key={Math.random()}>
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
                        const clone = { ...newTask };
                        clone.subtasks[index].title = e.target.value;
                        setNewTask(clone);
                        clearErrors(`subtask${item.id}`);
                      }}
                    />
                    <img
                      src={deleteIcon}
                      onClick={() => {
                        const clone: any = newTask;
                        clone.subtasks.splice(index, 1);
                        setNewTask({ ...clone });
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
          <SelectInput
            {...register("status")}
            onChange={(e) => {
              newTask.status = e.target.value;
            }}
          >
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
          Save Changes
        </StyledButton>
      </form>
    </FormWrapper>
  );
}
