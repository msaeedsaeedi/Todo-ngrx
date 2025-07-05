import { Todo } from '../models/todo.model';
import * as TodoActions from './todo.action';

describe('TodoActions', () => {
  it('should create initTodos action', () => {
    const action = TodoActions.initTodos();
    expect(action).toEqual({
      type: '[Todo] Init Todos',
    });
  });

  it('should create loadTodos action', () => {
    const todos: Todo[] = [{ id: 'test-uuid', text: 'Test Todo', completed: false }];
    const action = TodoActions.loadTodos({ todos });
    expect(action).toEqual({
      type: '[Todo] Load Todos',
      todos: todos,
    });
  });

  it('should create an addTodo action', () => {
    const action = TodoActions.addTodo({ text: 'Test Todo' });
    expect(action).toEqual({
      type: '[Todo] Add Todo',
      text: 'Test Todo',
    });
  });

  it('should create a removeTodo action', () => {
    const action = TodoActions.removeTodo({ id: 'test-uuid' });
    expect(action).toEqual({
      type: '[Todo] Remove Todo',
      id: 'test-uuid',
    });
  });

  it('should create a completeTodo action', () => {
    const action = TodoActions.completeTodo({ id: 'test-uuid' });
    expect(action).toEqual({
      type: '[Todo] Complete Todo',
      id: 'test-uuid',
    });
  });
});
