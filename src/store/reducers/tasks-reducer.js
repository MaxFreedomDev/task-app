const initialState = {
  tasks: [],
  error: null,
  loading: false,
  count: 0,
  successfully: null,
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_TASKS": {
      return { ...state, loading: true };
    }
    case "SET_TASKS": {
      return { ...state, tasks: action.payload, error: null, loading: false };
    }
    case "SET_TASKS_ERROR": {
      return { ...state, error: action.payload, loading: false };
    }
    case "SET_TOTAL_COUNT_TASK": {
      return { ...state, count: Number(action.payload) };
    }
    case "SUCCESSFULLY": {
      return { ...state, successfully: action.payload };
    }
    default:
      return state;
  }
};
