import {
  ADD_TODO,
  UPDATE_TODO_STATUS,
  UPDATE_FILTER,
  CLEAR_COMPLETED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT
} from '../actions';
import { createSelector } from 'reselect';
import { combineReducers } from 'redux';

export const VisibilityFilters = {
  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed'
};

const TODO_INITIAL_STATE = {
  todos: [],
  filter: VisibilityFilters.SHOW_ALL
};

const workspace = (state = TODO_INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.todo]
      };
    case UPDATE_TODO_STATUS:
      return {
        ...state,
        todos: state.todos.map(todo =>
          action.todo === todo ? { ...todo, complete: action.complete } : todo
        )
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filter: action.filter
      };
    case CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.complete)
      };
    default:
      return state;
  }
};

export const getTodosSelector = state => state.workspace.todos;
export const getFilterSelector = state => state.workspace.filter;

export const getVisibleTodosSelector = createSelector(
  getTodosSelector,
  getFilterSelector,
  (todos, filter) => {
    switch (filter) {
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter(todo => !todo.complete);
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter(todo => todo.complete);
      default:
        return todos;
    }
  }
);

export const statsSelector = createSelector(
  getTodosSelector,
  todos => {
    const completed = todos.filter(todo => todo.complete).length;
    return {
      completed,
      active: todos.length - completed
    };
  }
);

const login = () => {
  const loading = (state = false, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return true;
      case LOGIN_SUCCESS:
      case LOGIN_ERROR:
        return false;
      default:
        return state;
    }
  };

  const error = (state = false, action) => {
    switch (action.type) {
      case LOGIN_ERROR:
        return true;
      case LOGIN_REQUEST:
      case LOGIN_SUCCESS:
        return false;
      default:
        return state;
    }
  };

  const username = (state = null, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return action.username;
      case LOGOUT:
      case LOGIN_ERROR:
      case LOGIN_REQUEST:
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    username,
    error,
    loading
  });
};

export const loginSelector = state => state.login;

export const reducer = combineReducers({
  login: login(),
  workspace
});
