import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo.model';

export const initTodos = createAction('[Todo] Init Todos');

export const loadTodos = createAction(
  '[Todo] Load Todos',
  props<{ todos: Todo[] }>()
);

export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ text: string }>()
);

export const removeTodo = createAction(
  '[Todo] Remove Todo',
  props<{ id: string }>()
);

export const completeTodo = createAction(
  '[Todo] Complete Todo',
  props<{ id: string }>()
);
