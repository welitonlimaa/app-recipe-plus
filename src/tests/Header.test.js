import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouter';
import App from '../App';

describe('Testes para o componente Header', () => {
  test('Testa se o Header aparece em Recipes na rota `/drinks`, com o title certo', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/profile');
    });
    const linkDrink = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(linkDrink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks');
    const title = screen.getByRole('heading', { level: 1 });
    const imgProfile = screen.getByTestId('profile-top-btn');
    const imgSearch = screen.getByTestId('search-top-btn');
    expect(title).toHaveTextContent(/drinks/i);
    expect(imgProfile).toBeInTheDocument();
    expect(imgSearch).toBeInTheDocument();
  });
  test('Testa se aperece o titulo Meals na rota /meals', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
  });
});
