import { fetchDrinkAPI, fetchCategoryDrink, fetchByDrinkCategory, fetchDrinkRecipe }
  from '../../services/drinkApi';
import { fetchMealAPI, fetchCategoryMeal, fetchByMealCategory, fetchMealRecipe }
  from '../../services/mealApi';

const requestAPI = () => ({
  type: 'REQUEST_API',
});

const insertDataAPI = (data) => ({
  type: 'DATA_API',
  payload: data,
});

const changeDataMeals = (data) => ({
  type: 'CHANGE_DATA_MEALS',
  payload: data,
});

const changeDataDrinks = (data) => ({
  type: 'CHANGE_DATA_DRINKS',
  payload: data,
});

const resetDB = (data) => ({
  type: 'RESET_DB',
  payload: data,
});

const insertDataRecipe = (data) => ({
  type: 'DATA_RECIPE',
  payload: data,
});

export const fetchAPIs = () => async (dispatch) => {
  dispatch(requestAPI());
  const dataDrink = await fetchDrinkAPI();
  const dataMeal = await fetchMealAPI();
  const categorysDrink = await fetchCategoryDrink();
  const categorysMeal = await fetchCategoryMeal();
  dispatch(insertDataAPI({ dataDrink, dataMeal, categorysDrink, categorysMeal }));
};

export const fetchMealCategory = (category) => async (dispatch) => {
  // dispatch(requestAPI());
  const dataMeal = await fetchByMealCategory(category);
  dispatch(changeDataMeals(dataMeal));
};

export const fetchDrinkCategory = (category) => async (dispatch) => {
  // dispatch(requestAPI());
  const dataDrink = await fetchByDrinkCategory(category);
  dispatch(changeDataDrinks(dataDrink));
};

export const fetchResetDB = () => async (dispatch) => {
  const dataDrink = await fetchDrinkAPI();
  const dataMeal = await fetchMealAPI();
  dispatch(resetDB({ dataDrink, dataMeal }));
};

export const fetchRecipeById = (id, category) => async (dispatch) => {
  dispatch(requestAPI());
  let data = [];
  if (category === '/drink') {
    data = await fetchDrinkRecipe(id);
  } else {
    data = await fetchMealRecipe(id);
  }
  dispatch(insertDataRecipe(data));
};
