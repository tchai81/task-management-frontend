import UpdateForm from "../components/updateForm";
import { Suspense } from "react";

export default function UpdateTaskPage() {
  return (
    <div className="max-w-md mx-auto my-5">
      <Suspense>
        <UpdateForm />
      </Suspense>
    </div>
  );
}
