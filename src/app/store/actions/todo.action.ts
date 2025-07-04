import { createAction, props } from '@ngrx/store';

export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ text: string }>()
);

export const completeTodo = createAction(
  '[Todo] Complete Todo',
  props<{ id: number }>()
);
