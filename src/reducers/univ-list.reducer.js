const SEARCH = 'Search';
const SEARCH_SUCCESS = 'Search Success';
const SEARCH_FAIL = 'Search Fail';

export const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const actionTypes = {
  SEARCH,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
};

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case SEARCH: {
      return { ...state, loading: true };
    }
    case SEARCH_SUCCESS: {
      return {
        ...state,
        data: payload,
        loading: false,
        error: null,
      };
    }
    case SEARCH_FAIL: {
      return {
        ...state,
        data: [],
        loading: false,
        error: payload,
      };
    }
  }
}
