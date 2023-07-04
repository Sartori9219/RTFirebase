import { SET_USER, GET_USER, LOAD_USER } from "../types/user";

export const setUser = (data) => ({
  type: SET_USER,
  payload: data
});

export const getUser = () => ({
  type: GET_USER
});

export const loadUser = (data) => ({
  type: LOAD_USER,
  payload: data
});
