const INITIAL_STATE = {
  mealDB: '',
  drinkDB: '',
  isLoading: false,
};

const dataApiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_API': {
    return ({
      ...state,
      isLoading: true,
    });
  }
  case 'DATA_API': {
    return ({
      ...state,
      mealDB: action.payload.dataMeal,
      drinkDB: action.payload.dataDrink,
      isLoading: false,
    });
  }
  default:
    return state;
  }
};

export default dataApiReducer;
