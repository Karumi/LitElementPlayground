import nanoid from 'nanoid';
import { loginRequest } from '../../api';

export const ADD_TODO = 'add_todo';
export const UPDATE_TODO_STATUS = 'update_todo_status';
export const UPDATE_FILTER = 'update_filter';
export const CLEAR_COMPLETED = 'clear_completed';
export const LOGIN_SUCCESS = 'login_user';
export const LOGIN_REQUEST = 'login_request';
export const LOGIN_ERROR = 'login_error';
export const LOGOUT = 'logout';

export const loginUser = (username, password) => dispatch => {
  dispatch({
    type: LOGIN_REQUEST
  });

  return loginRequest(username, password)
    .then(response => {
      dispatch({
        type: LOGIN_SUCCESS,
        username: response.user.username
      });
    })
    .catch(error => {
      dispatch({
        type: LOGIN_ERROR
      });
    });
};

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

export const logout = () => {
  return {
    type: LOGOUT
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
