import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Todo } from './todo';
import { Store } from '@ngrx/store';
import { TodoActions } from '../store';
import { provideMockStore } from '@ngrx/store/testing';

describe('Todo', () => {
  let component: Todo;
  let fixture: ComponentFixture<Todo>;
  let store: Store;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Todo],
      providers: [provideMockStore({
        initialState: {
          todo: {
            todos: [{ id: 1, text: 'Test Todo', completed: false }]
          }
        }
      })],
    }).compileComponents();

    fixture = TestBed.createComponent(Todo);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    dispatchSpy = spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch addTodo action when addTodo is called with valid input', () => {
    component.newTodoText = 'New todo';
    component.addTodo();
    expect(dispatchSpy).toHaveBeenCalledWith(TodoActions.addTodo({ text: 'New todo' }));
    expect(component.newTodoText).toBe('');
  });

  it('should not dispatch addTodo action when addTodo is called with invalid input', () => {
    component.newTodoText = '     ';
    component.addTodo();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should dispatch completeTodo action when completeTodo is called', () => {
    component.completeTodo(1);
    expect(dispatchSpy).toHaveBeenCalledWith(TodoActions.completeTodo({ id: 1 }));
  });

  it('should display todos from the store', ()=> {
    fixture.detectChanges();
    const todoItem = (fixture.nativeElement as HTMLElement).querySelectorAll('li');
    expect(todoItem.length).toBe(1);
    expect(todoItem[0].textContent).toContain('Test Todo')
  })
});
