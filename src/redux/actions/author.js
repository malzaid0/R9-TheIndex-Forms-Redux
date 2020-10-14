import {SET_AUTHOR_LOADING, SET_AUTHOR_DETAIL, ADD_AUTHOR, SET_ERRORS, ADD_BOOK} from "./actionTypes";

import axios from "axios";
import {resetErrors} from "./errors";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com",
});

export const fetchAuthorDetail = (authorID) => async (dispatch) => {
  dispatch({
    type: SET_AUTHOR_LOADING,
  });
  try {
    const res = await instance.get(`/api/authors/${authorID}/`);
    const author = res.data;
    dispatch({
      type: SET_AUTHOR_DETAIL,
      payload: author,
    });
  } catch (err) {}
};

//POST THE BOOK TO https://the-index-api.herokuapp.com/api/books/
export const postBook = (newBook, closeModal) => async (dispatch) => {
  try {
    const res = await instance.post("/api/books/", newBook);
    const book = res.data;
    dispatch(resetErrors());
    dispatch({
      type: ADD_BOOK,
      payload: book,
    });
    closeModal();
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data,
    });
  }
};
