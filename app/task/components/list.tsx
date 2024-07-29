"use client";

import { useState, useEffect } from "react";
import ITask from "@/app/interfaces/iTask";
import ISelectOptions from "@/app/interfaces/iSelectOptions";
import axios from "axios";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import taskColumns from "@/app/columnDefs/task";
import Link from "next/link";
import statusOptions from "@/app/constants/statusOptions";
import { useMemo } from "react";

export default function TaskList() {
  const pageSize = 10;
  const [data, setData] = useState<ITask[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageTotal, setPageTotal] = useState<number>(1);

  const getTasks = () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/task/get?page=${page}&pageSize=${pageSize}`;
    axios.get(apiUrl).then((responses) => {
      setData(responses.data[0]);
      setPageTotal(Math.ceil(responses.data[1] / pageSize));
    });
  };

  useEffect(() => {
    getTasks();
  }, [page]);

  const additionalTaskColumns: ColumnDef<ITask>[] = [
    {
      header: "Status",
      accessorKey: "status",
      cell: (props: any) => {
        const { id, status }: ITask = props.row.original;

        const handleUpdateStatus = (currentStatus: number) => {
          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/task/${id}`;
          axios.patch(apiUrl, { id, status: +!currentStatus }).then(() => {
            //refresh the list upon update
            getTasks();
          });
        };

        const buttonColor = +status === 0 ? "bg-gray-500" : "bg-green-500";

        const assignedStatus: ISelectOptions | undefined = statusOptions.find(
          (statusOption: ISelectOptions) => status === +statusOption.value
        );

        return (
          <button
            onClick={() => handleUpdateStatus(+status)}
            className={`${buttonColor} text-white px-4 py-2 rounded text-xs`}
          >
            {assignedStatus?.label}
          </button>
        );
      },
    },
  ];

  const columns = useMemo(() => [...taskColumns, ...additionalTaskColumns], []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="flex flex-col md:flex-row justify-end mb-2">
        <div className="flex items-center mb-1 w-full">
          <div className="flex w-full">
            <div className="w-1/2">
              <Link
                href="/task/create"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
              >
                Create Task
              </Link>
            </div>
            <div className="flex w-1/2 text-xs justify-end items-center">
              <h1 className={`mb-1 font-semibold mr-3`}>
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </h1>
              {/* Page navigations */}
              <div className="text-white">
                <button
                  onClick={() => setPage(1)}
                  disabled={data.length === 0 || page === 1}
                  className={`mr-1 px-2 py-1 rounded-md disabled:bg-gray-200 bg-gray-400 text-xs`}
                >
                  {`<<`}
                </button>

                <button
                  onClick={() => setPage(page - 1)}
                  disabled={data.length === 0 || page === 1}
                  className={`mr-1 px-2 py-1 rounded-md disabled:bg-gray-200 bg-gray-400 text-xs`}
                >
                  {`<`}
                </button>

                <button
                  onClick={() => setPage(page + 1)}
                  disabled={data.length === 0 || page === pageTotal}
                  className={`mr-1 px-2 py-1 rounded-md disabled:bg-gray-200 bg-gray-400 text-xs`}
                >
                  {`>`}
                </button>

                <button
                  onClick={() => setPage(pageTotal)}
                  disabled={data.length === 0 || page === pageTotal}
                  className={`px-2 py-1 rounded-md disabled:bg-gray-200 bg-gray-400 text-xs`}
                >
                  {`>>`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table className="table table-auto border-collapse border w-full">
        <thead className="table-header-group">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="table-cell border border-black-500 bg-black text-white font-semibold p-3 text-left text-xs"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="table-row-group">
          {data.length == 0 && (
            <tr className="table-row text-sm bg-white">
              <td
                className="table-cell border p-3 text-xs text-center"
                colSpan={5}
              >
                No tasks assigned
              </td>
            </tr>
          )}
          {data.length > 0 &&
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="table-row text-sm bg-white">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="table-cell border p-3 text-xs">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
