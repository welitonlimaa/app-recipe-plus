import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouter';

describe('Testes para pagina Profile', () => {
  test('Testa se é redirencionado para a pagina do Profile corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');
    const a = screen.getByTestId('profile-top-btn');
    expect(a).toBeInTheDocument();
    userEvent.click(a);
    expect(history.location.pathname).toBe('/profile');
  });
  test('Testa se a pagina Profile tem um titulo', () => {
    renderWithRouterAndRedux(<App />, '/profile');
    const a = screen.getByTestId('page-title');
    expect(a).toBeInTheDocument();
  });
  test('Testa se a pagina Profile exibe o email', () => {
    renderWithRouterAndRedux(<App />, '/profile');
    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();
  });
  test('Testa se a pagina Profile possui um botão para acessar done Recipes', () => {
    const { history } = renderWithRouterAndRedux(<App />, '/profile');
    const doneBtn = screen.getByTestId('profile-done-btn');
    expect(doneBtn).toBeInTheDocument();
    userEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('Testa se a pagina Profile possui um botão para acessar favorite Recipes', () => {
    const { history } = renderWithRouterAndRedux(<App />, '/profile');
    const favBtn = screen.getByTestId('profile-favorite-btn');
    expect(favBtn).toBeInTheDocument();
    userEvent.click(favBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  test('Testa se a pagina Profile possui um botão para fazer o logout', () => {
    const { history } = renderWithRouterAndRedux(<App />, '/profile');
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  });
});
