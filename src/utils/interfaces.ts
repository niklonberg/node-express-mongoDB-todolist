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
  subtasks: Task[];
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
  currSelectedTask: null | Task;
  getTasks(): undefined[];
  getTask(taskID: string): Task | undefined;
  getSubtasks(): Task[];
  getSubtask(): Task;
  getTodayTasks(): Task[];
  getNext7DaysTasks(): Task[];
  setSelectedTask(taskID: number): void;
  resetSelectedTask(): void;
  addTask(task: Task, parentTodo?: Task): void;
  deleteTask(taskID: number): void;
  deleteSubtask(todoID: number): void;
  editTask(taskToEdit: Task, newTask: Task): void;
  toggleIsCompleted(taskID: number): Task;
  toggleCompletedDate(task: Task): void;
  reorderTask(index: number, taskListItem: TaskListItemWithDataset): void;
}
/* eslint-disable no-unused-vars */
