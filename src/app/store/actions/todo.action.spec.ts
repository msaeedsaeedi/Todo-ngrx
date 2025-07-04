import * as TodoActions from './todo.action';

describe('TodoActions', () => {
  it('should create an addTodo action', () => {
    const action = TodoActions.addTodo({ text: 'Test Todo' });
    expect(action).toEqual({
      type: '[Todo] Add Todo',
      text: 'Test Todo',
    });
  });

  it('should create a completeTodo action', () => {
    const action = TodoActions.completeTodo({ id: 1 });
    expect(action).toEqual({
      type: '[Todo] Complete Todo',
      id: 1,
    });
  });
});
