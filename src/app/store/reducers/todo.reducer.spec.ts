import { initialState, TodoActions, todoReducer, TodoState } from '..';

describe('TodoReducer', () => {
  it('should return initial state', () => {
    const action = { type: 'UNKNOWN' };
    const state = todoReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('Should add a todo', () => {
    const action = TodoActions.addTodo({ text: 'Test Todo' });
    const newState = todoReducer(initialState, action);
    expect(newState.todos.length).toBe(1);
    expect(newState.todos[0]).toEqual({
      id: 1,
      text: 'Test Todo',
      completed: false,
    });
  });

  it('Should complete a todo', () => {
    const state: TodoState = {
      todos: [{ id: 1, text: 'Test Todo', completed: false }],
    };
    const action = TodoActions.completeTodo({ id: 1 });
    const newState = todoReducer(state, action);
    expect(newState.todos[0].completed).toBe(true);
  });
});
