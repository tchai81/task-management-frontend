"use client";

import { useState, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import ITask from "@/app/interfaces/iTask";
import ICreateUpdateFormLabels from "@/app/interfaces/iCreateUpdateFormLabels";
import axios from "axios";
import CreateUpdateTaskForm from "./createUpdateTaskForm";
import { useRouter } from "next/navigation";
import handleBack from "@/app/mixins/handleBack";

export default function UpdateForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [task, setTask] = useState<ITask | null>(null);
  const createUpdateFormLabels: ICreateUpdateFormLabels = {
    title: "Update Task",
    submitButtonLabel: "Update Task",
  };
  const searchParams = useSearchParams();
  const taskId = searchParams.get("id") || "";

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/task/get/${taskId}`;
    axios.get(apiUrl).then((response) => {
      setTask(response.data);
    });
  }, []);

  const updateTask: SubmitHandler<ITask> = async (data: ITask) => {
    const url: string = `${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}`;
    const payload: ITask = {
      ...data,
      priority: data.priority ? data?.priority : null,
      status: data.status,
    };
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    axios
      .patch(url, payload)
      .then(() => {
        setSuccessMessage(`Task Id: ${taskId}  Updated.`);
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
    <div>
      <button
        onClick={() => handleBack(router)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
      >
        Go Back
      </button>
      <div>
        <CreateUpdateTaskForm
          task={task}
          loading={loading}
          successMessage={successMessage}
          errorMessage={errorMessage}
          resetForm={false}
          onSubmitHandler={updateTask}
          createUpdateFormLabels={createUpdateFormLabels}
        />
      </div>
    </div>
  );
}
