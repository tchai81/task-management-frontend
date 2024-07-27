export default interface ITask {
  title: string | null;
  description: string | null;
  priority: number | null;
  endDate: Date | null;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}
