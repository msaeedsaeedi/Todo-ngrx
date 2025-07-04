import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import * as TodoActions from '../actions/todo.action';
import { tap, map } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { selectAllTodos } from '../selectors/todo.selector';

@Injectable()
export class TodoEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);

  saveTodos$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.addTodo, TodoActions.completeTodo),
        tap(() => {
          this.store.select(selectAllTodos).subscribe((todos) => {
            localStorage.setItem('todos', JSON.stringify(todos));
          });
        })
      ),
    { dispatch: false }
  );

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.initTodos),
      map(() => {
        const todos = JSON.parse(localStorage.getItem('todos') || '[]');
        return TodoActions.loadTodos({ todos });
      })
    )
  );

  logAddTodo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.addTodo),
        tap((action) => console.log(`Added todo: ${action.text}`))
      ),
    { dispatch: false }
  );

  logCompleteTodo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.completeTodo),
        tap((action) => console.log(`Completed todo with ID: ${action.id}`))
      ),
    { dispatch: false }
  );

  ngrxOnInitEffects(): Action {
    return TodoActions.initTodos();
  }
}
