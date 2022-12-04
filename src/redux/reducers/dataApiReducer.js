const INITIAL_STATE = {
  mealDB: [],
  drinkDB: [],
  categorysDrink: [],
  categorysMeal: [],
  recipe: [],
  isLoading: true,
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
      categorysDrink: action.payload.categorysDrink,
      categorysMeal: action.payload.categorysMeal,
      isLoading: false,
    });
  }
  case 'CHANGE_DATA_MEALS': {
    return ({
      ...state,
      mealDB: action.payload,
      isLoading: false,
    });
  }
  case 'CHANGE_DATA_DRINKS': {
    return ({
      ...state,
      drinkDB: action.payload,
      isLoading: false,
    });
  }
  case 'RESET_DB': {
    return ({
      ...state,
      mealDB: action.payload.dataMeal,
      drinkDB: action.payload.dataDrink,
      isLoading: false,
    });
  }
  case 'DATA_RECIPE': {
    return ({
      ...state,
      recipe: action.payload,
      isLoading: false,
    });
  }
  default:
    return state;
  }
};

export default dataApiReducer;
