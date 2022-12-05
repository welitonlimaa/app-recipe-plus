const INITIAL_STATE = {
  recipe: {},
  drinksSuggest: [],
  mealsSuggest: [],
};

const recipeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'DATA_RECIPE':
    return ({
      ...state,
      recipe: action.payload,
    });
  case 'DATA_SUGGEST':
    return ({
      ...state,
      mealsSuggest: action.payload.dataMeal,
      drinksSuggest: action.payload.dataDrink,
    });
  default:
    return state;
  }
};

export default recipeReducer;
