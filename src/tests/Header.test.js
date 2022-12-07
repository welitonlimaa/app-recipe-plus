import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente Header', () => {
  test('se ao clicar no botão profile, é redirecionado para a rota "/profile"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/profile');
    });
    const profilePic = screen.getByTestId('profile-top-btn');
    userEvent.click(profilePic);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
  test('Testa se o a pagina Profile tem um titulo', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/profile');
    });
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
});
