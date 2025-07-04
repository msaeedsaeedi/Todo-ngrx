import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAllTodos, TodoActions } from '../store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-todo',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  store = inject(Store);
  todos$ = this.store.select(selectAllTodos);
  newTodoText: string = '';

  addTodo() {
    if (this.newTodoText.trim()) {
      this.store.dispatch(TodoActions.addTodo({ text: this.newTodoText }));
      this.newTodoText = '';
    }
  }

  completeTodo(id: number) {
    this.store.dispatch(TodoActions.completeTodo({ id }));
  }
}
