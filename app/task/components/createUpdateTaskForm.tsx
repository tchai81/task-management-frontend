"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import IRegisterOptions from "@/app/interfaces/iRegisterOptions";
import ITask from "@/app/interfaces/iTask";
import ICreateUpdateFormLabels from "@/app/interfaces/iCreateUpdateFormLabels";
import ISelectOptions from "@/app/interfaces/iSelectOptions";
import priorityOptions from "@/app/constants/priorityOptions";
import statusOptions from "@/app/constants/statusOptions";
import formatDate from "@/app/mixins/formatDate";

export default function CreateUpdateTaskForm({
  task,
  loading,
  successMessage,
  errorMessage,
  resetForm,
  onSubmitHandler,
  createUpdateFormLabels,
}: {
  task: ITask | null;
  loading: boolean;
  successMessage: string;
  errorMessage: string;
  resetForm: boolean;
  onSubmitHandler: SubmitHandler<ITask>;
  createUpdateFormLabels: ICreateUpdateFormLabels;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ITask>();

  const registerOptions: IRegisterOptions = {
    title: {
      required: "Title is required",
    },
    priority: {
      required: "Priority is required",
    },
  };

  useEffect(() => {
    if (resetForm) {
      reset({
        title: null,
        description: null,
        priority: null,
        endDate: null,
        status: "0",
      });
    }
  }, [resetForm]);

  useEffect(() => {
    const formattedDate = formatDate(task?.endDate || null);
    reset({
      title: task?.title,
      description: task?.description,
      priority: task?.priority,
      endDate: formattedDate,
      status: String(task?.status),
    });
  }, [task]);

  return (
    <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">
        {createUpdateFormLabels.title}
      </h2>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
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
            {statusOptions.map((statusOption, index) => (
              <div key={`${statusOption.label}-${statusOption.value}`}>
                <label className="inline-flex items-center">
                  <input
                    {...register("status")}
                    type="radio"
                    value={statusOption.value}
                    className="form-radio text-blue-600 h-4 w-4"
                  />
                  <span className="ml-2 text-sm">{statusOption.label}</span>
                </label>
              </div>
            ))}
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
              {createUpdateFormLabels.submitButtonLabel}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
