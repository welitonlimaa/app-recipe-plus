export const fetchMealAPI = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.meals;
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

export const fetchMealRecipe = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.meals[0];
};

export const fetchSearchMeals = async ({ searchRadio, searchInput }) => {
  switch (searchRadio) {
  case 'name': {
    try {
      const nameEndpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
      const response = await fetch(nameEndpoint);
      const data = await response.json();
      return data.meals;
    } catch (error) {
      return null;
    }
  }
  case 'First letter': {
    try {
      const firstLetterEndpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
      const response = await fetch(firstLetterEndpoint);
      const data = await response.json();
      return data.meals;
    } catch (error) {
      return null;
    }
  }
  case 'ingredient': {
    try {
      const ingredientEndpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
      const response = await fetch(ingredientEndpoint);
      const data = await response.json();
      return data.meals;
    } catch (error) {
      return null;
    }
  }
  default:
    return [];
  }
};
