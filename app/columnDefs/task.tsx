import ITask from "../interfaces/iTask";
import { ColumnDef } from "@tanstack/react-table";
import formatDate from "../mixins/formatDate";
import Link from "next/link";

const columns: ColumnDef<ITask>[] = [
  {
    header: "Id",
    accessorKey: "id",
    cell: (props: any) => (
      <Link href={`/task/update?id=${props.getValue()}`}>
        <div className="text-blue-500 underline">{props.getValue()}</div>
      </Link>
    ),
  },
  {
    header: "Title",
    accessorKey: "title",
    cell: (props: any) => {
      const { id } = props.row.original;
      return (
        <Link href={`/task/update?id=${id}`}>
          <div className="text-blue-500 underline">{props.getValue()}</div>
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
    cell: (props: any) => {
      return formatDate(props.getValue());
    },
  },
  {
    header: "Status",
    accessorKey: "status",
  },
];

export default columns;
