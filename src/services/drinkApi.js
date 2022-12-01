export const fetchDrinkAPI = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  const num = 12;
  const reduceArray = data.drinks.slice(0, num);
  return reduceArray;
};

export const fetchCategoryDrink = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  const categorys = data.drinks.map((category) => category.strCategory);
  const indexNum = 5;
  const reduceCategorys = categorys.slice(0, indexNum);
  return reduceCategorys;
};
