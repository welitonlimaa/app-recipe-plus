import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouter';
import App from '../App';
import mockDataMeals from './helpers/mocksMeals/mockDataMeals';
import mockMealsCategory from './helpers/mocksMeals/mockMealsCategory';
// import mockDataDrinks from './helpers/mocksDrinks/mockDataDrinks';
// import mockDrinksCategory from './helpers/mocksDrinks/mockDrinksCategory';

jest
  .fn()
  .mockResolvedValue([])
  .mockReturnValueOnce(mockDataMeals)
  .mockReturnValueOnce(mockMealsCategory);

afterEach(() => {
  jest.clearAllMocks();
});

describe('Testa a página Footer', () => {
  test('Testa se o ícone de Meals redireciona para a página "/Meals" se o ícone de Drinks redireciona para a página "/Drinks"', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    const loading = screen.getByText('loading...');
    await waitForElementToBeRemoved(loading);
    const buttonDrink = screen.getByAltText(/Bebidas/i);
    userEvent.click(buttonDrink);
    expect(history.location.pathname).toBe('/drinks');
    const buttonMeals = screen.getByAltText(/Comidas/i);
    userEvent.click(buttonMeals);
    expect(history.location.pathname).toBe('/meals');
  });
});
