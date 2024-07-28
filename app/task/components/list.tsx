"use client";

import { useState, useEffect } from "react";
import ITask from "@/app/interfaces/iTask";
import axios from "axios";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import columns from "@/app/columnDefs/task";

export default function TaskList() {
  const pageSize = 10;
  const [data, setData] = useState<ITask[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageTotal, setPageTotal] = useState<number>(1);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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

  return (
    <>
      <div className="flex flex-col md:flex-row justify-end">
        <div className="flex items-center mb-1 w-full">
          <div className="flex w-full">
            <div className="w-1/2">Tasks</div>
            <div className="flex w-1/2 text-xs justify-center items-center">
              <h1 className={`mb-1 font-semibold mr-3`}>
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </h1>
              {/* Page navigations */}
              <div className="text-white">
                <button
                  onClick={() => setPage(1)}
                  disabled={page === 1}
                  className={`mr-1 px-2 py-1 rounded-md disabled:bg-gray-200 bg-gray-400 text-xs`}
                >
                  {`<<`}
                </button>

                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className={`mr-1 px-2 py-1 rounded-md disabled:bg-gray-200 bg-gray-400 text-xs`}
                >
                  {`<`}
                </button>

                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === pageTotal}
                  className={`mr-1 px-2 py-1 rounded-md disabled:bg-gray-200 bg-gray-400 text-xs`}
                >
                  {`>`}
                </button>

                <button
                  onClick={() => setPage(pageTotal)}
                  disabled={page === pageTotal}
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
                  className="table-cell border border-black-500 bg-black text-white font-semibold p-3 text-xs"
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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="table-row text-sm bg-white text-black">
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
