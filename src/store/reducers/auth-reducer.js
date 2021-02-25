const initialState = {
  authentication: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_AUTH": {
      return { ...state, authentication: action.payload, error: null };
    }
    case "SET_ERROR": {
      return { ...state, error: action.payload };
    }
    default:
      return state;
  }
};
