export const fetchMealAPI = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  const num = 12;
  const reduceArray = data.meals.slice(0, num);
  return reduceArray;
};

export const fetchCategoryMeal = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  const categorys = data.meals.map((category) => category.strCategory);
  const indexNum = 5;
  const reduceCategorys = categorys.slice(0, indexNum);
  return reduceCategorys;
};

export const fetchByMealCategory = async (category) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  const num = 12;
  const reduceArray = data.meals.slice(0, num);
  return reduceArray;
};
