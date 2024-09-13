
import { combineReducers } from 'redux';

const initialState = {
  tickets: [],
  users: [],
  error: null
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TASKS_SUCCESS':
      return { ...state, tickets: action.payload.tickets, users: action.payload.users };
    case 'FETCH_TASKS_FAILURE':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export default rootReducer;

