type PriorityLevel = "Low" | "Medium" | "High";

export interface Task {
  _id?: string;
  order: number;
  title: string;
  priority: PriorityLevel;
  isCompleted: boolean;
  dateCompleted: null | Date;
  dueDate: null | Date;
  description?: string;
  subtasks: Subtask[];
}

export interface Subtask extends Omit<Task, "_id"> {}
