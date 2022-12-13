import React from 'react';
// import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouter';
import App from '../App';
import SearchBar from '../components/SearchBar';

describe('Testes para o componente SearchBar', () => {
  test(' Testa se o searchBar aparece ao clicar no button com a imagem da lupa', () => {
    renderWithRouterAndRedux(<SearchBar />);
    const btn = screen.getByRole('button');
    userEvent.click(btn);
    const search = screen.getByTestId('exec-search-btn');
    expect(search).toBeInTheDocument();
    userEvent.click(btn);
    expect(search).toBeInTheDocument();
  });
  test('Testa a existencia da rota /meals', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/meals');
    expect(history.location.pathname).toBe('/meals');
  });
  test('Testa a existencia da rota /drinks', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/drinks');
    expect(history.location.pathname).toBe('/drinks');
  });
});
