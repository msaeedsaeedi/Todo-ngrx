import { ReplaySubject } from 'rxjs';
import * as TodoActions from '../actions/todo.action';
import { TodoEffects } from './todo.effect';
import { TestBed } from '@angular/core/testing';
import { Action, provideStore } from '@ngrx/store';
import { todoReducer } from '../reducers/todo.reducer';
import { Actions, provideEffects } from '@ngrx/effects';

describe('TodoEffects', () => {
  let actions$: ReplaySubject<Action>;
  let effects: TodoEffects;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);

    TestBed.configureTestingModule({
      providers: [
        provideStore({ todo: todoReducer }),
        provideEffects([TodoEffects]),
        { provide: Actions, useValue: actions$ },
      ],
    });

    effects = TestBed.inject(TodoEffects);
  });

  afterEach(() => {
    actions$.complete();
  });

  it('should log addTodo action', (done) => {
    spyOn(console, 'log');
    const action = TodoActions.addTodo({ text: 'Test Todo' });
    actions$.next(action);

    effects.logAddTodo$.subscribe(() => {
      expect(console.log).toHaveBeenCalledWith('Added todo: Test Todo');
      done();
    });
  });

  it('should log completeTodo action', (done) => {
    spyOn(console, 'log');
    const action = TodoActions.completeTodo({ id: 1 });
    actions$.next(action);

    effects.logCompleteTodo$.subscribe(() => {
      expect(console.log).toHaveBeenCalledWith('Completed todo with ID: 1');
      done();
    });
  });
});
