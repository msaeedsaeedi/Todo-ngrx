import { createReducer, on } from '@ngrx/store';
import { TodoState } from '../models/todo.model';
import * as TodoActions from '../actions/todo.action';

export const initialState: TodoState = {
  todos: [],
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.addTodo, (state, { text }) => ({
    ...state,
    todos: [
      ...state.todos,
      { id: state.todos.length + 1, text, completed: false },
    ],
  })),
  on(TodoActions.completeTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: true } : todo
    ),
  }))
);
