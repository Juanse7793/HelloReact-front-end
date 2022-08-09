const initState = {
  message: '',
};

const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCHING_MESSAGE':
      return {
        ...state,
        loaded: true,
      };
    case 'COMPLETE_MESSAGE':
      return { message: action.payload.message };
    default:
      return state;
  }
};

export const fetchmessage = () => async (dispatch) => {
  dispatch({ type: 'FETCHING_MESSAGE' });
  await fetch('http://127.0.0.1:3000/v1/messages')
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type: 'COMPLETE_MESSAGE', payload: data });
    })
    .catch(() => dispatch({ type: 'FETCHING_MESSAGE' }));
};

export default messageReducer;
