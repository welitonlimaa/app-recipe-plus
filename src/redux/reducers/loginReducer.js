import { LOGIN } from '../actions/userActions';

const INITIAL_STATE = {
  email: '',
  senha: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN: {
    return ({
      ...state,
      email: action.payload.email,
      senha: action.payload.senha,
    });
  }
  default:
    return state;
  }
};

export default loginReducer;
