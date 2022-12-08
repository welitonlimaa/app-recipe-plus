import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import renderWithRouterAndRedux from './helpers/renderWithRouter';

describe('Testa a página Footer', () => {
  test('Testa se o ícone de Meals redireciona para a página "/Meals"', () => {
    const { history } = renderWithRouterAndRedux(<Footer />);
    const a = screen.getByRole('button', { name: /Comidas/i });
    userEvent.click(a);
    expect(history.location.pathname).toBe('/meals');
  });
  test('Testa se o ícone de Drinks redireciona para a página "/Drinks"', () => {
    const { history } = renderWithRouterAndRedux(<Footer />);
    const a = screen.getByRole('button', { name: /Bebidas/i });
    userEvent.click(a);
    expect(history.location.pathname).toBe('/drinks');
  });
});
