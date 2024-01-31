type PriorityLevel = "Low" | "Medium" | "High";

export interface Task {
  _id?: string;
  sortOrder: number;
  title: string;
  priority: PriorityLevel;
  isCompleted: boolean;
  dateCompleted: null | Date;
  dueDate: null | Date;
  description?: string;
  subtasks: Task[];
}

/* eslint-disable no-unused-vars */
export interface TaskManagerInterface {
  // topLevelTodos: Todo[];
  currSelectedTask: Task;
  task: Task | null;
  getTasks(): Task[];
  getTask(taskID: number, taskArray: Task[]): Task;
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

// export interface Subtask extends Omit<Task, "_id"> {}