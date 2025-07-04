import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Todo } from './todo/todo';
import { provideStore } from '@ngrx/store';
import { todoReducer } from './store';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, Todo],
      providers: [provideStore({ todo: todoReducer })],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have todo component', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-todo')).toBeTruthy();
  });
});
