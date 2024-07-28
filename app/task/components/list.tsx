"use client";

import { useState, useEffect } from "react";
import ITask from "@/app/interfaces/iTask";
import axios from "axios";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import columns from "@/app/columnDefs/task";

export default function TaskList() {
  const [data, setData] = useState<ITask[]>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/task/get`;
    axios.get(apiUrl).then((responses) => {
      setData(responses.data);
    });
  }, []);

  return (
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
  );
}
