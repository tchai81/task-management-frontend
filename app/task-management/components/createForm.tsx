"use client";

import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import ITask from "@/app/interfaces/iTask";
import ICreateUpdateFormLabels from "@/app/interfaces/iCreateUpdateFormLabels";
import axios from "axios";
import CreateUpdateTaskForm from "./createUpdateTaskForm";

export default function CreateForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resetForm, setResetForm] = useState<boolean>(false);
  const createUpdateFormLabels: ICreateUpdateFormLabels = {
    title: "Add New Task",
    submitButtonLabel: "Add Task",
  };

  const createTask: SubmitHandler<ITask> = async (data: ITask) => {
    const url: string = `${process.env.NEXT_PUBLIC_API_URL}/task`;
    const payload: ITask = {
      ...data,
      priority: data.priority ? +data?.priority : null,
      status: +data.status,
    };
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    setResetForm(false);
    axios
      .post(url, payload)
      .then(() => {
        setResetForm(true);
        setSuccessMessage("Task Added.");
      })
      .catch((responses) => {
        let errorMessages = responses?.response?.data?.message || [];
        errorMessages = Array.isArray(errorMessages)
          ? errorMessages.join("<hr />")
          : errorMessages;
        setErrorMessage(errorMessages);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <CreateUpdateTaskForm
      loading={loading}
      successMessage={successMessage}
      errorMessage={errorMessage}
      resetForm={resetForm}
      onSubmitHandler={createTask}
      createUpdateFormLabels={createUpdateFormLabels}
    />
  );
}
