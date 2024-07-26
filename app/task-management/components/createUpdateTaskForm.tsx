"use client";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import IRegisterOptions from "@/app/interfaces/iRegisterOptions";
import ITaskManagement from "@/app/interfaces/iTaskManagementPayload";
import ISelectOptions from "@/app/interfaces/iSelectOptions";
import priorityOptions from "@/app/constants/priorityOptions";

export default function CreateUpdateTaskForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ITaskManagement>();

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
    const url: string = "";
    console.log(data);
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

        <div className="my-6">
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                {...register("status")}
                type="radio"
                value="Incomplete"
                className="form-radio text-blue-600 h-4 w-4"
                defaultChecked
              />
              <span className="ml-2 text-sm">Incomplete</span>
            </label>
            <label className="inline-flex items-center">
              <input
                {...register("status")}
                type="radio"
                value="Completed"
                className="form-radio text-blue-600 h-4 w-4"
              />
              <span className="ml-2 text-sm">Completed</span>
            </label>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 text-sm"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}
