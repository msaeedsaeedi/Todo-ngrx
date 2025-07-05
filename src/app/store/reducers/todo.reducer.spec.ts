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
    expect(typeof newState.todos[0].id).toBe('string');
    expect(newState.todos[0].id.length).toBeGreaterThan(0);
  });

  it('should remove a todo', () => {
    // Create a valid state with a todo having a UUID
    const addAction = TodoActions.addTodo({ text: 'Test Todo' });
    const stateWithTodo = todoReducer(initialState, addAction);
    const todoId = stateWithTodo.todos[0].id;
    
    const action = TodoActions.removeTodo({ id: todoId });
    const newState = todoReducer(stateWithTodo, action);
    expect(newState.todos.length).toBe(0);
  });

  it('Should complete a todo', () => {
    // Create a valid state with a todo having a UUID
    const addAction = TodoActions.addTodo({ text: 'Test Todo' });
    const stateWithTodo = todoReducer(initialState, addAction);
    const todoId = stateWithTodo.todos[0].id;
    
    const action = TodoActions.completeTodo({ id: todoId });
    const newState = todoReducer(stateWithTodo, action);
    expect(newState.todos[0].completed).toBe(true);
  });

  it('should generate unique UUIDs for todos', () => {
    const action1 = TodoActions.addTodo({ text: 'First Todo' });
    const state1 = todoReducer(initialState, action1);
    const action2 = TodoActions.addTodo({ text: 'Second Todo' });
    const state2 = todoReducer(state1, action2);

    expect(state1.todos[0].id).not.toBe(state2.todos[1].id);
    expect(state2.todos.length).toBe(2);
    
    const ids = state2.todos.map((todo) => todo.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it('should generate unique UUIDs when adding todos after removal', () => {
    // Create a valid state with todos having UUIDs
    let state = todoReducer(initialState, TodoActions.addTodo({ text: 'First Todo' }));
    state = todoReducer(state, TodoActions.addTodo({ text: 'Second Todo' }));
    
    const firstTodoId = state.todos[0].id;
    state = todoReducer(state, TodoActions.removeTodo({ id: firstTodoId }));
    state = todoReducer(state, TodoActions.addTodo({ text: 'Todo 3' }));

    const ids = state.todos.map((todo) => todo.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });
});
