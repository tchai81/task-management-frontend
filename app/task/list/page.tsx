import TaskList from "../components/list";
import { Suspense } from "react";

export default function TaskListPage() {
  return (
    <div className="w-3/5 mx-auto my-10">
      <Suspense>
        <TaskList />
      </Suspense>
    </div>
  );
}
