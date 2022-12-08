import React from 'react';
import { screen } from '@testing-library/react';
import RecipeDrinkCard from '../components/RecipeDrinkCard';
import mockDrinks from './helpers/mockDrinks';
import renderWithRouterAndRedux from './helpers/renderWithRouter';

describe('Testes para pagina Drinks', () => {
  test('Verificar os elementos do Drink', async () => {
    renderWithRouterAndRedux(<RecipeDrinkCard />);
    const a = await screen.findByTestId('Ordinary Drink-category-filter');
    expect(a).toBeInTheDocument();

    const b = await screen.findByTestId('Cocktail-category-filter');
    expect(b).toBeInTheDocument();

    const c = await screen.findByTestId('Shake-category-filter');
    expect(c).toBeInTheDocument();
  });
  test('Testa se renderiza os 12 recipe-cards', async () => { // X
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockDrinks),
    }));
    renderWithRouterAndRedux(<RecipeDrinkCard />);
    const a = await screen.findByTestId('page-title');
    expect(a).toBeInTheDocument();
    const b = await screen.findAllByTestId(/recipe-card/);
    expect(b.length).toBe(12);
  });
});
