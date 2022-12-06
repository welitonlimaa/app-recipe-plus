import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouter';
import App from '../App';

describe('Teste do Header', () => {
  test('1 - Verifica se é renderizado corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => { history.push('/meals'); });
    expect(history.location.pathname).toBe('/meals');
    expect(screen.getByText('Meals')).toBeInTheDocument();
    const profileBTN = screen.getByTestId('profile-top-btn');
    expect(profileBTN).toBeInTheDocument();
    const searchBTN = screen.getByTestId('search-top-btn');
    expect(searchBTN).toBeInTheDocument();
  });

  test('2 - Verifica se ele redirenciona para a pagina de perfil corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');
    const profileBTN = screen.getByTestId('profile-top-btn');
    expect(profileBTN).toBeInTheDocument();
    userEvent.click(profileBTN);
    expect(history.location.pathname).toBe('/profile');
  });

  test('3 - Verifica se ele abre barra de busca', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');
    const searchBTN = screen.getByTestId('search-top-btn');
    expect(searchBTN).toBeInTheDocument();
    userEvent.click(searchBTN);
    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
  });
});
