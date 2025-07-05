import { selectAllTodos, selectTodoState, AppState } from '..';

describe('TodoSelectors', () => {
  const mockState: AppState = {
    todo: {
      todos: [
        { id: 'uuid-1', text: 'Test Todo', completed: false },
        { id: 'uuid-2', text: 'Another Todo', completed: true },
      ],
    },
  };

  it('should select the todo state', () => {
    const result = selectTodoState(mockState);
    expect(result).toEqual(mockState.todo);
  });

  it('should select all todos', () => {
    const result = selectAllTodos(mockState);
    expect(result).toEqual(mockState.todo.todos);
    expect(result.length).toBe(2);
    expect(result[0].text).toBe('Test Todo');
  });
});