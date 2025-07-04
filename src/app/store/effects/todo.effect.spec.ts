import { of, ReplaySubject } from 'rxjs';
import * as TodoActions from '../actions/todo.action';
import { TodoEffects } from './todo.effect';
import { TestBed } from '@angular/core/testing';
import { Action, provideStore, Store } from '@ngrx/store';
import { todoReducer } from '../reducers/todo.reducer';
import { Actions, provideEffects } from '@ngrx/effects';
import { Todo } from '../models/todo.model';

describe('TodoEffects', () => {
  let actions$: ReplaySubject<Action>;
  let effects: TodoEffects;
  let store: Store;
  let localStorageMock: { [key: string]: string };

  beforeEach(() => {
    localStorageMock = {};
    spyOn(localStorage, 'getItem').and.callFake(
      (key: string) => localStorageMock[key] || null
    );
    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string) => {
        localStorageMock[key] = value;
      }
    );

    actions$ = new ReplaySubject(1);

    TestBed.configureTestingModule({
      providers: [
        provideStore({ todo: todoReducer }),
        provideEffects([TodoEffects]),
        { provide: Actions, useValue: actions$ },
      ],
    });

    effects = TestBed.inject(TodoEffects);
    store = TestBed.inject(Store);
  });

  afterEach(() => {
    actions$.complete();
  });

  it('should save todos to localStorage on addTodo action', (done) => {
    const todos: Todo[] = [{ id: 1, text: 'Test Todo', completed: false }];
    spyOn(store, 'select').and.returnValue(of(todos));
    const action = TodoActions.addTodo({ text: 'Test Todo' });

    actions$.next(action);
    effects.saveTodos$.subscribe(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'todos',
        JSON.stringify(todos)
      );
      done();
    });
  });

  it('should save todos to localStorage on completeTodo action', (done) => {
    const todos: Todo[] = [{ id: 1, text: 'Test Todo', completed: false }];
    spyOn(store, 'select').and.returnValue(of(todos));
    const action = TodoActions.completeTodo({ id: 1 });

    actions$.next(action);
    effects.saveTodos$.subscribe(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'todos',
        JSON.stringify(todos)
      );
      done();
    });
  });

  it('should load todos from localStorage on initTodos action', (done) => {
    const todos = [{ id: 1, text: 'Test Todo', completed: false }];
    localStorageMock['todos'] = JSON.stringify(todos);
    const action = TodoActions.initTodos();

    actions$.next(action);
    effects.loadTodos$.subscribe((result) => {
      expect(result).toEqual(TodoActions.loadTodos({ todos }));
      done();
    });
  });

  it('should handle empty localStorage on initTodos action', (done) => {
    const action = TodoActions.initTodos();

    actions$.next(action);
    effects.loadTodos$.subscribe((result) => {
      expect(result).toEqual(TodoActions.loadTodos({ todos: [] }));
      done();
    });
  });

  it('should return initTodos action on initialization', () => {
    const action = effects.ngrxOnInitEffects();
    expect(action).toEqual(TodoActions.initTodos());
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
