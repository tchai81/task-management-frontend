import ITask from "../interfaces/iTask";
import { ColumnDef } from "@tanstack/react-table";
import formatDate from "../mixins/formatDate";

const columns: ColumnDef<ITask>[] = [
  {
    header: "Title",
    accessorKey: "title",
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
