import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouter';
import App from '../App';
// import Header from '../components/Header';

describe('Testes para o componente Header', () => {
  const dataIdBtnTopSearch = 'search-top-btn';
  const dataIdBtnTopProfile = 'profile-top-btn';
  const dataIdPageTitle = 'page-title';
  // const dataIdInputTopSearch = 'search-input';
  test('Testa se /done-recipes possui título e o ícone de perfil', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/done-recipes');
    });
    expect(history.location.pathname).toBe('/done-recipes');
    expect(screen.getByTestId(dataIdBtnTopProfile)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdPageTitle)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Done Recipes');
  });
  test('Testa se /favorite-recipes possui título e o ícone de perfil', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/favorite-recipes');
    });
    expect(history.location.pathname).toBe('/favorite-recipes');
    expect(screen.getByTestId(dataIdBtnTopProfile)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdPageTitle)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Favorite Recipes');
  });
  test('Testa se /meals possui título e os ícones de perfil e pesquisa', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    const loading = screen.getByText('loading...');
    await waitForElementToBeRemoved(loading);
    expect(history.location.pathname).toBe('/meals');
    expect(screen.getByTestId(dataIdBtnTopProfile)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdPageTitle)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Meals');
    expect(screen.getByTestId(dataIdBtnTopSearch)).toBeInTheDocument();
  });
  test('Testa se /drinks possui título e os ícones de perfil e pesquisa', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    const loading = screen.getByText('loading...');
    await waitForElementToBeRemoved(loading);
    expect(history.location.pathname).toBe('/drinks');
    expect(screen.getByTestId(dataIdBtnTopProfile)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdPageTitle)).toBeInTheDocument();
    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Drinks');
    expect(screen.getByTestId(dataIdBtnTopSearch)).toBeInTheDocument();
  });
  test('Testa se a mudança de tela é funcional', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');
    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Meals');
    userEvent.click(screen.getByTestId(dataIdBtnTopProfile));
    expect(history.location.pathname).toBe('/profile');
    expect(screen.getByTestId(dataIdPageTitle).innerHTML).toBe('Profile');
  });
});
