import Axios from 'axios';
import axios from 'axios';
import {API_URL} from '../config';

/* selectors */
export const getAllUsers = ({users}) => users.data;

/* action name creator */
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

/* thunk creators */

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchStarted());
      let res = await Axios.get('http://localhost:8000/api/users');
      if (res) dispatch(fetchSuccess(res)) ;
    } catch (err) {
      dispatch(fetchError(err.message || true));
    }
  };
};

export const updateUserRequest = (id, user) => {
  return async (dispatch) => {
    dispatch(fetchStarted());
    try {
      await axios.put(`${API_URL}/user/${id}`, user);
    } catch (err) {
      dispatch(fetchError(err.message || true));
    }
  };
};

/* initial state */
const initialState = {
  data: [],
  requests: [],
};

/* reducer */
export const reducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload.data,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    default:
      return statePart;
  }
};
