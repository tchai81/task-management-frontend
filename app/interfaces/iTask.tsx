export default interface ITask {
  id?: number;
  title: string | null;
  description: string | null;
  priority: number | string | null;
  endDate: string | null;
  status: number | string;
  createdAt?: Date;
  updatedAt?: Date;
}
