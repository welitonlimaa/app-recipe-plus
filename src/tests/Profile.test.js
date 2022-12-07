import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouter';

describe('Testa a página Header', () => {
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
});
