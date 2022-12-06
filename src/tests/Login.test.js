import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouter';
import Login from '../pages/Login';

describe('Testa a página Login', () => {
  const emailA = 'email-input';
  const passwordB = 'password-input';
  const loginC = 'login-submit-btn';
  it('Testa se possui um email e senha válidos', () => {
    renderWithRouterAndRedux(<Login />);
    const a = screen.getByTestId(emailA);
    const b = screen.getByTestId(passwordB);
    const button = screen.getByTestId(loginC);
    userEvent.type(a, 'teste@hotmail.com');
    expect(button).toBeDisabled();
    userEvent.type(b, '1234567');
    expect(button).not.toBeDisabled();
  });
  it('Testa os campos de email e senha e um botão funcional', () => {
    renderWithRouterAndRedux(<Login />);
    const a = screen.getByTestId(emailA);
    expect(a).toBeInTheDocument();
    const b = screen.getByTestId(passwordB);
    expect(b).toBeInTheDocument();
    const button = screen.getByTestId(loginC);
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
  it('Testa se o usuário é redirecionado após login e senha válidos', async () => {
    renderWithRouterAndRedux(<Login />);
    const a = screen.getByTestId(emailA);
    const b = screen.getByTestId(passwordB);
    const c = '{"email":"teste@hotmail.com"}';
    const button = screen.getByTestId(loginC);
    userEvent.type(a, 'teste@hotmail.com');
    userEvent.type(b, '1234567');
    userEvent.click(button);
    expect(localStorage.getItem('user')).toBe(c);
  });
});
