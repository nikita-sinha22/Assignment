
import axios from 'axios';

export const fetchTasks = () => async dispatch => {
  try {
    const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment/');
    dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_TASKS_FAILURE', payload: error.message });
  }
};

