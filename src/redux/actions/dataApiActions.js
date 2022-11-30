import fetchDrinkAPI from '../../services/drinkApi';
import fetchMealAPI from '../../services/mealApi';

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
  dispatch(insertDataAPI({ dataDrink, dataMeal }));
};

export default fetchAPIs;
