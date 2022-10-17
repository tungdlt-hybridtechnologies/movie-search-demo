import { useCallback, useEffect, useReducer } from 'react';

const ACTIONS = {
  SEARCH_MOVIE_REQUEST: 'SEARCH_MOVIE_REQUEST',
  SEARCH_MOVIES_SUCCESS: 'SEARCH_MOVIES_SUCCESS',
  SEARCH_MOVIES_FAILURE: 'SEARCH_MOVIES_FAILURE',
};
const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SEARCH_MOVIE_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case ACTIONS.SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case ACTIONS.SEARCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};
const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=4a3b711b';

export function useMovieSearch() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        dispatch({
          type: 'SEARCH_MOVIES_SUCCESS',
          payload: jsonResponse.Search,
        });
      });
  }, []);

  const search = useCallback((searchValue) => {
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST',
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === 'True') {
          dispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: jsonResponse.Search,
          });
        } else {
          dispatch({
            type: 'SEARCH_MOVIES_FAILURE',
            error: jsonResponse.Error,
          });
        }
      });
  }, []);
  return { state, search };
}
