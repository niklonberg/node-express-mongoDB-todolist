import { Task } from "../utils/interfaces";
import { ObjectId } from "mongodb";

class TaskFactory {
  isCompleted: boolean;
  dateCompleted: null | Date;

  constructor(
    public title: string,
    public priorityLevel: string,
    public dueDate: null | Date,
    public description: string,
    public subtasks: Task[],
    public sortOrder?: number,
    private _id?: ObjectId
  ) {
    this.isCompleted = false;
    this.dateCompleted = null;
  }
}

export default TaskFactory;
