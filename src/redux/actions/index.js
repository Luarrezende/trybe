import { getApi } from '../../service';
// Coloque aqui suas actions
export const FETCH_API = 'FETCH_API';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const START_EDIT = 'START_EDIT';
export const FINISH_EDIT = 'FINISH_EDIT';

export const addUser = (email) => ({
  type: 'USER',
  payload: email,
});

export const apiList = (data) => ({
  type: FETCH_API,
  currencies: data,
});

export const add = (expense) => ({
  type: ADD_EXPENSE,
  expenses: expense,
});

export const removeExpense = (payload) => ({
  type: REMOVE_EXPENSE,
  payload,
});

export const editStart = (payload) => ({
  type: START_EDIT,
  payload,
});

export const editFinish = (payload) => ({
  type: FINISH_EDIT,
  payload,
});

export const addExpense = (state) => async (dispatch) => {
  const api = await getApi();
  dispatch(add({ ...state, exchangeRates: api }));
};
