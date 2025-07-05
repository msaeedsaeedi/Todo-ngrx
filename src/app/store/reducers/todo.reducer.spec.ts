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
    expect(newState.todos[0].text).toEqual('Test Todo');
    expect(newState.todos[0].completed).toBe(false);
  });

  it('should remove a todo', () => {
    
    const action = TodoActions.removeTodo({ id: 1 });
    const newState = todoReducer(initialState, action);
    expect(newState.todos.length).toBe(0);
  });

  it('Should complete a todo', () => {
    const state: TodoState = {
      todos: [{ id: 1, text: 'Test Todo', completed: false }],
    };
    const action = TodoActions.completeTodo({ id: 1 });
    const newState = todoReducer(state, action);
    expect(newState.todos[0].completed).toBe(true);
  });

  it('should generate unique IDs for todos', () => {
    const action1 = TodoActions.addTodo({ text: 'First Todo' });
    const state1 = todoReducer(initialState, action1);
    const action2 = TodoActions.addTodo({ text: 'Second Todo' });
    const state2 = todoReducer(state1, action2);

    expect(state1.todos[0].id).toBe(1);
    expect(state2.todos[1].id).toBe(2);
    expect(state2.todos.length).toBe(2);
  });
});
