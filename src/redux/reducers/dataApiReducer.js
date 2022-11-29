// import { LOGIN } from '../actions/userActions';

const INITIAL_STATE = {
  meatDB: '',
  drinkDB: '',
};

const dataApiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'DATA_API': {
    return ({
      ...state,
      meatDB: action.payload,
      drinkDB: action.payload,
    });
  }
  default:
    return state;
  }
};

export default dataApiReducer;
