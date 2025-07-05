import { createReducer, on } from '@ngrx/store';
import { TodoState } from '../models/todo.model';
import * as TodoActions from '../actions/todo.action';
import { v4 as uuidv4 } from 'uuid';

export const initialState: TodoState = {
  todos: [],
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.addTodo, (state, { text }) => {
    return {
      ...state,
      todos: [
        ...state.todos,
        { id: uuidv4(), text, completed: false },
      ],
    };
  }),
  on(TodoActions.removeTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  })),
  on(TodoActions.completeTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: true } : todo
    ),
  })),
  on(TodoActions.loadTodos, (state, { todos }) => ({
    ...state,
    todos,
  }))
);
