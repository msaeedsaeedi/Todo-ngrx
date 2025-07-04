import { createSelector } from '@ngrx/store';
import { TodoState } from '../models/todo.model';

export interface AppState {
  todo: TodoState;
}

export const selectTodoState = (state: AppState) => state.todo;
export const selectAllTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos
);
