// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCH_API, ADD_EXPENSE, REMOVE_EXPENSE,
  START_EDIT, FINISH_EDIT } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  edit: false,
  idEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_API:
    return {
      ...state,
      currencies: action.currencies,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: [...action.payload],
    };
  case START_EDIT:
    return {
      ...state,
      edit: true,
      idEdit: action.payload,
    };

  case FINISH_EDIT:
    return {
      ...state,
      expenses: action.payload,
      edit: false,
      idEdit: 0,
    };
  default:
    return state;
  }
};

export default wallet;
