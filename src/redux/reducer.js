import {
    ADD_TODO,
    UPDATE_TODO_STATUS,
    UPDATE_FILTER,
    CLEAR_COMPLETED
} from './actions.js';
import { createSelector } from 'reselect';

export const VisibilityFilters = {
    SHOW_ALL: 'All',
    SHOW_ACTIVE: 'Active',
    SHOW_COMPLETED: 'Completed'
};

const INITIAL_STATE = {
    todos: [],
    filter: VisibilityFilters.SHOW_ALL
};

export const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.todo]
            }
        case UPDATE_TODO_STATUS:
            return {
                ...state,
                todos: state.todos.map(todo => 
                    action.todo === todo ? {...todo, complete: action.complete } : todo
                )
            }  
        case UPDATE_FILTER:
            return {
                ...state,
                filter: action.filter
            }
        case CLEAR_COMPLETED:
            return {
                ...state,
                todos: state.todos.filter(todo => !todo.complete)
            }
        default:
            return state;
    }
};


const getTodosSelector = state => state.todos;
const getFilterSelector = state => state.filter;

export const getVisibleTodosSelector = createSelector(
    getTodosSelector,
    getFilterSelector,
    (todos, filter) => {
        switch(filter) {
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
    (todos) => {
        const completed = todos.filter(todo => todo.complete).length;
        return {
            completed,
            active: todos.length - completed
        }
    }
);