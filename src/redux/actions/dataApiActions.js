import { fetchDrinkAPI, fetchCategoryDrink } from '../../services/drinkApi';
import { fetchMealAPI, fetchCategoryMeal } from '../../services/mealApi';

const requestAPI = () => ({
  type: 'REQUEST_API',
});

const insertDataAPI = (data) => ({
  type: 'DATA_API',
  payload: data,
});

const fetchAPIs = () => async (dispatch) => {
  dispatch(requestAPI());
  const dataDrink = await fetchDrinkAPI();
  const dataMeal = await fetchMealAPI();
  const categorysDrink = await fetchCategoryDrink();
  const categorysMeal = await fetchCategoryMeal();
  dispatch(insertDataAPI({ dataDrink, dataMeal, categorysDrink, categorysMeal }));
};

export default fetchAPIs;
