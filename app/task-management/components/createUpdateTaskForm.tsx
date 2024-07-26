"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import IRegisterOptions from "@/app/interfaces/iRegisterOptions";
import ITaskManagement from "@/app/interfaces/iTaskManagementPayload";
import ISelectOptions from "@/app/interfaces/iSelectOptions";
import priorityOptions from "@/app/constants/priorityOptions";
import axios from "axios";
import { useState } from "react";

export default function CreateUpdateTaskForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ITaskManagement>();

  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const registerOptions: IRegisterOptions = {
    title: {
      required: "Title is required",
    },
    priority: {
      required: "Priority is required",
    },
  };

  const createOrUpdateTask: SubmitHandler<ITaskManagement> = async (
    data: ITaskManagement
  ) => {
    const url: string = `${process.env.NEXT_PUBLIC_API_URL}/task`;
    const payload: ITaskManagement = {
      ...data,
      priority: data.priority ? +data?.priority : null,
      status: +data.status,
    };
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    axios
      .post(url, payload)
      .then(() => {
        //resetting form upon successfully submission
        reset({
          title: null,
          description: null,
          priority: null,
          endDate: null,
          status: 0,
        });
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
    <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Add New Task</h2>
      <form onSubmit={handleSubmit(createOrUpdateTask)}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2 text-sm"
          >
            Title
          </label>
          <input
            {...register("title", registerOptions.title)}
            type="text"
            placeholder="Enter task title"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sm"
          />
          <span className="text-xs text-red-500">
            {errors.title && `${errors?.title?.message}`}
          </span>
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-semibold mb-2 text-sm"
          >
            Description
          </label>
          <textarea
            {...register("description", registerOptions.priority)}
            rows={4}
            placeholder="Enter task description"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sm"
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="priority"
            className="block text-gray-700 font-semibold mb-2 text-sm"
          >
            Priority
          </label>
          <select
            {...register("priority", registerOptions.priority)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sm"
          >
            <option value="">Please Select</option>
            {priorityOptions &&
              priorityOptions.map((priorityOptions: ISelectOptions) => (
                <option
                  key={`${priorityOptions.value}`}
                  value={`${priorityOptions.value}`}
                >{`${priorityOptions.label}`}</option>
              ))}
          </select>
          <span className="text-xs text-red-500">
            {errors.priority && `${errors?.priority?.message}`}
          </span>
        </div>

        <div className="mb-4">
          <label
            htmlFor="due_date"
            className="block text-gray-700 font-semibold mb-2 text-sm"
          >
            Due Date
          </label>
          <input
            {...register("endDate")}
            type="date"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sm"
          />
        </div>

        <div className="my-1">
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                {...register("status")}
                type="radio"
                value="0"
                className="form-radio text-blue-600 h-4 w-4"
                defaultChecked
              />
              <span className="ml-2 text-sm">Incomplete</span>
            </label>
            <label className="inline-flex items-center">
              <input
                {...register("status")}
                type="radio"
                value="1"
                className="form-radio text-blue-600 h-4 w-4"
              />
              <span className="ml-2 text-sm">Completed</span>
            </label>
          </div>
        </div>

        {errorMessage.length > 0 && (
          <div
            className="bg-red-500 text-white text-sm p-2"
            dangerouslySetInnerHTML={{ __html: errorMessage }}
          />
        )}
        {successMessage.length > 0 && (
          <div className="bg-green-500 text-white text-sm p-2">
            {successMessage}
          </div>
        )}

        <div className="text-center">
          {loading && "Loading....."}
          {!loading && (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 text-sm mt-5"
            >
              Add Task
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
