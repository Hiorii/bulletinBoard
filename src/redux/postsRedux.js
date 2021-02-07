import axios from 'axios';
/* selectors */
export const getAll = ({posts}) => posts.data;
export const getAllCategories = ({categories}) => categories.data;
//export const getAllPublished = ({posts}) => posts.data.filter(item => item.status === 'published');

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');
const UPDATE_POST = createActionName('UPDATE_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addPost = payload => ({ payload, type: ADD_POST});
export const updatePost = payload => ({ payload, type: UPDATE_POST});

/* thunk creators */
export const fetchPublished = () => {
  return (dispatch, getState) => {
    const { posts } = getState();
    if (!posts.data.length || posts.loading.active === false) {
      dispatch(fetchStarted());
    }
    axios
      .get('http://localhost:8000/api/posts')
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
      .get(`http://localhost:8000/api/posts/${id}`)
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
      let res = await axios.post('http://localhost:8000/api/posts', post);
      dispatch(addPost(res));
      dispatch(fetchSuccess());
    } catch (err) {
      dispatch(fetchError(err.message || true));
    }
  };
};

export const updatePostRequest = (id, post) => {
  return async (dispatch) => {
    dispatch(fetchStarted());
    try {
      let res = await axios.put(`http://localhost:8000/api/posts/${id}`, post);
      dispatch(updatePost(res));
      dispatch(fetchSuccess());
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
    case ADD_POST: {
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
        loading: {
          active: false,
          error: false,
        },
      };
    }
    case UPDATE_POST: {
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
        loading: {
          active: false,
          error: false,
        },
      };
    }
    default:
      return statePart;
  }
};
