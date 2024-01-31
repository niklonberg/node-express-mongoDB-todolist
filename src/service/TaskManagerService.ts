/* 
form submit method needs to change between
post and put depending on whether an edit or new task
*/

import { isToday, addDays, isWithinInterval, sub } from "date-fns";
import {
  Task,
  Subtask,
  TaskManagerInterface,
  TaskListItemWithDataset,
} from "../utils/interfaces";

/**
 * Transfers data between endpoints and database.
 * @param projects - The project containing the Todos.
 * @param todoID - The ID of the Todo to retrieve.
 * @returns The Todo with the specified ID.
 */
class TaskManagerService implements TaskManagerInterface {
  private tasks: Task[];

  private currSelectedTask: Task | null;

  // parentTodo: null | Task;

  constructor() {
    this.tasks = []; // get tasks from db and set here.
    this.currSelectedTask = this.tasks[0];
  }

  /* Get methods */
  getTasks() {
    return this.tasks;
  }

  getTask(taskID: string): Task | null {
    const foundTask = this.tasks.find((task) => task._id === taskID);
    return foundTask || null;
  }

  getSubtasks(task: Task) {
    return task.subtasks;
  }

  getTodaySubtasks() {
    return this.getTasks().reduce(
      (acc: Subtask[], curr) => [
        ...acc,
        ...curr.subtasks.filter(
          (subtask) => subtask.dueDate && isToday(subtask.dueDate)
        ),
      ],
      []
    );
  }

  getNext7DaysSubtasks() {
    const today = new Date().setHours(0, 0, 0);
    const sevenDaysLater = addDays(today, 7);
    return this.getTasks().reduce(
      (acc: Subtask[], curr) => [
        ...acc,
        ...curr.subtasks.filter(
          (subtask) =>
            subtask.dueDate &&
            isWithinInterval(subtask.dueDate, {
              start: today,
              end: sevenDaysLater,
            })
        ),
      ],
      []
    );
  }

  /* Set methods */
  setSelectedTodo(taskID: string) {
    this.currSelectedTask = this.getTask(taskID);
  }

  resetSelectedTodo() {
    this.currSelectedTask = null;
  }

  /* Add methods */
  addTask(task: Task) {
    this.tasks.push(task);
  }

  addSubtask(subtask: Subtask) {
    this.currSelectedTask?.subtasks.push(subtask);
  }

  /* Delete methods */
  deleteTask(taskID: string) {
    this.tasks = this.tasks.filter((task) => task._id !== taskID);
  }

  deleteSubtask(taskID: string): void {
    const task = this.getTask(taskID);
    // task.subtasks = task?.subtasks.filter((subtask) => subtask !== todo);
  }

  /* Edit methods */
  editTodo(
    todoToEdit: Todo,
    newTodo: Todo,
    todoArray: Todo[] = this.topLevelTodos
  ): void {
    const foundTodo = todoArray.find(
      (currTodo) => currTodo.todoID === todoToEdit.todoID
    );
    if (foundTodo) {
      Object.assign(foundTodo, { ...newTodo, children: foundTodo.children });
    } else {
      todoArray.forEach((childTodo) =>
        this.editTodo(todoToEdit, newTodo, childTodo.children)
      );
    }
  }

  toggleIsCompleted(todoID: number): Todo {
    const todo = this.getTodo(todoID);
    todo.isCompleted = !todo.isCompleted;
    console.log("Todo complete: ", todo.isCompleted);
    this.toggleCompletedDate(todo);
    if (this.parentTodo.children.every((childTodo) => childTodo.isCompleted)) {
      // toggle parent complete
    }
    return todo;
  }

  /* eslint-disable no-param-reassign, class-methods-use-this */
  toggleCompletedDate(todo: Todo): void {
    if (!todo.dateCompleted) {
      todo.dateCompleted = new Date();
    } else {
      todo.dateCompleted = null;
    }
    console.log(todo.dateCompleted);
  }
  /* eslint-enable no-param-reassign */

  reorderTodo(
    indexToReorderTodoTo: number,
    todoItem: TodoListItemWithDataset
  ): void {
    const todoToReorder = this.getTodo(Number(todoItem.dataset.todo));
    this.topLevelTodos = this.topLevelTodos.filter(
      (todo) => todo.todoID !== todoToReorder.todoID
    );
    this.topLevelTodos.splice(indexToReorderTodoTo, 0, todoToReorder);

    setTimeout(
      () => console.log("Toplevel Todos after: ", this.topLevelTodos),
      0
    );
  }
}

export default TaskManagerService;
