import nanoid from 'nanoid';

export const ADD_TODO = 'add_todo';
export const UPDATE_TODO_STATUS = 'update_todo_status';
export const UPDATE_FILTER = 'update_filter';
export const CLEAR_COMPLETED = 'clear_completed';

export const addTodo = task => {
  return {
    type: ADD_TODO,
    todo: {
      id: nanoid(),
      task,
      complete: false
    }
  };
};

export const updateTodoStatus = (todo, complete) => {
  return {
    type: UPDATE_TODO_STATUS,
    todo,
    complete
  };
};

export const updateFilter = filter => {
  return {
    type: UPDATE_FILTER,
    filter
  };
};

export const clearCompleted = () => {
  return {
    type: CLEAR_COMPLETED
  };
};
