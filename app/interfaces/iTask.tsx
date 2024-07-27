export default interface ITask {
  title: string | null;
  description: string | null;
  priority: string | null;
  endDate: string | null;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
