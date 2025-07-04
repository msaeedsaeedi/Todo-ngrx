import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TodoActions from '../actions/todo.action';
import { tap } from 'rxjs';

@Injectable()
export class TodoEffects {
  private actions$ = inject(Actions);

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
}
