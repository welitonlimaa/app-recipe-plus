import React from 'react';
import { screen } from '@testing-library/react';
import RecipeMealCard from '../components/RecipeMealCard';
import mockMeals from './helpers/mockMeals';
import renderWithRouterAndRedux from './helpers/renderWithRouter';

describe('Testes para pagina Meals', () => {
  test('Verificar os elementos do Meals', async () => {
    renderWithRouterAndRedux(<RecipeMealCard />);
    const a = await screen.findByTestId('Beef-category-filter');
    expect(a).toBeInTheDocument();

    const b = await screen.findByTestId('Breakfast-category-filter');
    expect(b).toBeInTheDocument();

    const c = await screen.findByTestId('Chicken-category-filter');
    expect(c).toBeInTheDocument();
  });
  test('Testa se renderiza os 12 recipe-cards', async () => { // X
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockMeals),
    }));
    renderWithRouterAndRedux(<RecipeMealCard />);
    const a = await screen.findAllByTestId(/recipe-card/);
    expect(a.length).toBe(12);
  });
});
