import PropTypes from 'prop-types';
import React from 'react';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  isValid = () => {
    // verifica se os input são validos
    const { password, email } = this.state;
    const minPassword = 6;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return regex.test(email) && password.length > minPassword;
  };

  handleChange = ({ target }) => {
    // registra a alteração no estado
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { email } = this.state;
    const { history } = this.props;
    // console.log({ email });
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="container-fluid">
        <main className="position-absolute top-50 start-50 translate-middle">
          <form className="d-grid gap-2">
            <h1 className="display-6">Login</h1>
            <label htmlFor="email" className="form-label d-block">
              <input
                type="text"
                id="email"
                className="form-control"
                data-testid="email-input"
                onChange={ this.handleChange }
                name="email"
                value={ email }
              />
            </label>
            <label htmlFor="password" className="form-label d-block">
              <input
                type="password"
                className="form-control"
                data-testid="password-input"
                id="password"
                name="password"
                value={ password }
                onChange={ this.handleChange }
              />
            </label>
            <button
              className="btn btn-secondary"
              type="button"
              data-testid="login-submit-btn"
              disabled={ !this.isValid() }
              onClick={ this.handleClick }
            >
              Enter
            </button>
          </form>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default Login;
