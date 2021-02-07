import axios from 'axios';
import {API_URL} from '../config';

/* selectors */
export const getAll = ({posts}) => posts.data;
export const getAllCategories = ({categories}) => categories.data;

/* action name creator */
const reducerName = 'posts';
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
export const fetchPublished = () => {
  return (dispatch, getState) => {
    const { posts } = getState();
    if (!posts.data.length || posts.loading.active === false) {
      dispatch(fetchStarted());
    }
    axios
      .get(`${API_URL}/posts`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const postById = (id) => {
  return (dispatch, getState) => {
    const { posts } = getState();
    if (!posts.data.length || posts.loading.active === false) {
      dispatch(fetchStarted());
    }
    axios
      .get(`${API_URL}/posts/${id}`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const addPostRequest = (post) => {
  return async (dispatch) => {
    dispatch(fetchStarted());
    try {
      await axios.post(`${API_URL}/posts`, post);
    } catch (err) {
      dispatch(fetchError(err.message || true));
    }
  };
};

export const updatePostRequest = (id, post) => {
  return async (dispatch) => {
    dispatch(fetchStarted());
    try {
      await axios.put(`${API_URL}/posts/${id}`, post);
    } catch (err) {
      dispatch(fetchError(err.message || true));
    }
  };
};

/* INITIAL STATE */

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
        data: action.payload,
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
