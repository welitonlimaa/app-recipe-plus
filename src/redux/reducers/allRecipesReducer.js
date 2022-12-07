const INITIAL_STATE = {
  mealDB: [],
  drinkDB: [],
  categorysDrink: [],
  categorysMeal: [],
  isLoading: true,
  history: '/',
};

const allRecipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_API':
    return ({
      ...state,
      isLoading: false,
    });
  case 'DATA_API':
    return ({
      ...state,
      mealDB: action.payload.dataMeal,
      drinkDB: action.payload.dataDrink,
      categorysDrink: action.payload.categorysDrink,
      categorysMeal: action.payload.categorysMeal,
      isLoading: false,
      history: action.payload.history,
    });
  case 'CHANGE_DATA_MEALS':
    return ({
      ...state,
      mealDB: action.payload,
      isLoading: false,
    });
  case 'CHANGE_DATA_DRINKS':
    return ({
      ...state,
      drinkDB: action.payload,
      isLoading: false,
    });
  case 'RESET_DB':
    return ({
      ...state,
      mealDB: action.payload.dataMeal,
      drinkDB: action.payload.dataDrink,
      isLoading: false,
    });
  case 'UPDATE_ROUTE':
    return ({
      ...state,
      history: action.payload,
    });
  default:
    return state;
  }
};

export default allRecipesReducer;
