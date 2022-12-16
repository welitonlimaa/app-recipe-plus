import {
  fetchDrinkAPI,
  fetchCategoryDrink,
  fetchByDrinkCategory,
  fetchDrinkRecipe,
  fetchSearchDrinks,
} from '../../services/drinkApi';
import {
  fetchMealAPI,
  fetchCategoryMeal,
  fetchByMealCategory,
  fetchMealRecipe,
  fetchSearchMeals,
} from '../../services/mealApi';

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

const insertSuggest = (data) => ({
  type: 'DATA_SUGGEST',
  payload: data,
});

const reduceData = (data) => {
  const num = 12;
  const reduceArray = data.slice(0, num);
  return reduceArray;
};

export const updateRoute = (payload) => ({
  type: 'UPDATE_ROUTE',
  payload,
});

export const fetchAPIs = (history) => async (dispatch) => {
  let dataDrink = [];
  let dataMeal = [];
  let categorysDrink = [];
  let categorysMeal = [];
  if (history.includes('drink')) {
    dataDrink = await fetchDrinkAPI();
    dataDrink = reduceData(dataDrink);
    categorysDrink = await fetchCategoryDrink();
  } else {
    dataMeal = await fetchMealAPI();
    dataMeal = reduceData(dataMeal);
    categorysMeal = await fetchCategoryMeal();
  }

  dispatch(insertDataAPI({
    dataDrink,
    dataMeal,
    categorysDrink,
    categorysMeal,
    history }));
  dispatch(requestAPI());
};

export const fetchMealCategory = (category) => async (dispatch) => {
  const dataMeal = await fetchByMealCategory(category);

  dispatch(changeDataMeals(dataMeal));
  dispatch(requestAPI());
};

export const fetchDrinkCategory = (category) => async (dispatch) => {
  const dataDrink = await fetchByDrinkCategory(category);

  dispatch(changeDataDrinks(dataDrink));
  dispatch(requestAPI());
};

export const fetchResetDB = () => async (dispatch) => {
  let dataDrink = await fetchDrinkAPI();
  dataDrink = reduceData(dataDrink);
  let dataMeal = await fetchMealAPI();
  dataMeal = reduceData(dataMeal);

  dispatch(resetDB({ dataDrink, dataMeal }));
  dispatch(requestAPI());
};

export const fetchRecipeById = (id, category) => async (dispatch) => {
  dispatch(requestAPI());
  if (category.includes('drinks')) {
    const dataRecipe = await fetchDrinkRecipe(id);

    dispatch(insertDataRecipe(dataRecipe));
    dispatch(requestAPI());
  } else {
    const dataRecipe = await fetchMealRecipe(id);

    dispatch(insertDataRecipe(dataRecipe));
    dispatch(requestAPI());
  }
};

export const fetchSuggest = () => async (dispatch) => {
  const dataDrink = await fetchDrinkAPI();
  const dataMeal = await fetchMealAPI();

  dispatch(insertSuggest({ dataDrink, dataMeal }));
  dispatch(requestAPI());
};

export const fetchSearchItems = (route, searchObject) => async (dispatch) => {
  if (route === '/meals') {
    let searchRecipe = await fetchSearchMeals(searchObject);
    searchRecipe = searchRecipe !== null ? reduceData(searchRecipe) : null;
    dispatch(changeDataMeals(searchRecipe));
    dispatch(requestAPI());
  } else {
    let searchRecipe = await fetchSearchDrinks(searchObject);
    searchRecipe = searchRecipe !== null ? reduceData(searchRecipe) : null;
    dispatch(changeDataDrinks(searchRecipe));
    dispatch(requestAPI());
  }
};
