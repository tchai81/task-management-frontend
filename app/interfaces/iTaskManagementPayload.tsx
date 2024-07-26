export default interface ITaskManagement {
  title: string;
  description: string;
  priority: string;
  endDate: Date;
  status: "Completed" | "InComplete";
}
