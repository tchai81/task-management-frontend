export default interface ITaskManagement {
  title: string | null;
  description: string | null;
  priority: number | null;
  endDate: Date | null;
  status: number;
}
