import ITask from "../interfaces/iTask";
import { ColumnDef } from "@tanstack/react-table";
import formatDate from "../mixins/formatDate";
import Link from "next/link";

const taskColumns: ColumnDef<ITask>[] = [
  {
    header: "Id",
    accessorKey: "id",
    cell: (props: any) => {
      const { id } = props.row.original;
      return (
        <Link href={`/task/update?id=${id}`}>
          <div className="text-blue-500 underline">{id}</div>
        </Link>
      );
    },
  },
  {
    header: "Title",
    accessorKey: "title",
    cell: (props: any) => {
      const { id, title } = props.row.original;
      return (
        <Link href={`/task/update?id=${id}`}>
          <div className="text-blue-500 underline">{title}</div>
        </Link>
      );
    },
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Due Date",
    accessorKey: "endDate",
    cell: (props: any) => formatDate(props.getValue()),
  },
];

export default taskColumns;
