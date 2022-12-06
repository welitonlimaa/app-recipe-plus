export const fetchDrinkAPI = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.drinks;
};

export const fetchCategoryDrink = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  const categorys = data.drinks.map((category) => category.strCategory);
  const indexNum = 5;
  const reduceCategorys = categorys.slice(0, indexNum);
  return reduceCategorys;
};

export const fetchByDrinkCategory = async (category) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  const num = 12;
  const reduceArray = data.drinks.slice(0, num);
  return reduceArray;
};

export const fetchDrinkRecipe = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.drinks[0];
};

export const fetchSearchDrinks = async ({ searchRadio, searchInput }) => {
  switch (searchRadio) {
  case 'name': {
    const nameEndpoint = `http://www.thecocktaildb.com/api/json/v1/1/search.php?s${searchInput}`;
    const response = await fetch(nameEndpoint);
    const data = await response.json();
    return data;
  }
  case 'First letter': {
    const fLEndpoint = `http://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`;
    const response = await fetch(fLEndpoint);
    const data = await response.json();
    return data;
  }
  default: {
    const ingredientEndpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
    const response = await fetch(ingredientEndpoint);
    const data = await response.json();
    return data;
  }
  }
};
