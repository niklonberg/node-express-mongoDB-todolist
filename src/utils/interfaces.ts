type PriorityLevel = "Low" | "Medium" | "High";

export interface Task {
  _id: string;
  sortOrder: number;
  title: string;
  priority: PriorityLevel;
  isCompleted: boolean;
  dateCompleted: null | Date;
  dueDate: null | Date;
  description?: string;
  subtasks: Subtask[];
}

export interface Subtask extends Omit<Task, "_id" | "sortOrder"> {}

// do we need this?
export interface TaskListItemWithDataset extends HTMLElement {
  dataset: {
    task: string;
  };
}

/* eslint-disable no-unused-vars */
export interface TaskManagerInterface {
  tasks: Task[];
  currSelectedTask: Task | null;
  getTasks(): Task[];
  getTask(taskID: string): Task | null;
  getSubtasks(task: Task): Subtask[];
  getSubtask(): Subtask;
  getTodaySubtasks(): Subtask[];
  getNext7DaysSubtasks(): Subtask[];
  setSelectedTask(taskID: number): void;
  resetSelectedTask(): void;
  addTask(task: Task): void;
  addSubtask(subtask: Subtask): void;
  deleteTask(taskID: string): void;
  deleteSubtask(todoID: number): void;
  editTask(taskToEdit: Task, newTask: Task): void;
  toggleIsCompleted(taskID: number): Task;
  toggleCompletedDate(task: Task): void;
  reorderTask(index: number, taskListItem: TaskListItemWithDataset): void;
}
/* eslint-disable no-unused-vars */
