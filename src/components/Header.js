import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

class Header extends React.Component {
  state = {
    searchBtn: true,
    title: '',
    renderSearchInput: false,
  };

  componentDidMount() {
    this.returnTitle();
  }

  returnTitle = () => {
    // Retorna titulo personalizado de acordo com a rota recebida.
    const { history: { location: { pathname } } } = this.props;
    switch (pathname) {
    case '/meals':
      this.setState({
        searchBtn: true,
        title: 'Meals',
      });
      break;
    case '/drinks':
      this.setState({
        searchBtn: true,
        title: 'Drinks',
      });
      break;
    case '/profile':
      this.setState({
        searchBtn: false,
        title: 'Profile',
      });
      break;
    case '/done-recipes':
      this.setState({
        searchBtn: false,
        title: 'Done Recipes',
      });
      break;
    case '/favorite-recipes':
      this.setState({
        searchBtn: false,
        title: 'Favorite Recipes',
      });
      break;
    default:
      break;
    }
  };


  redirectProfile = () => {
    const { history } = this.props;
    history.push('/profile');

  handleClick = () => {
    this.setState((oldState) => ({ renderSearchInput: !oldState.renderSearchInput }));

  };

  render() {
    const { searchBtn, title, renderSearchInput } = this.state;
    return (
      <header>
        <h1 data-testid="page-title">{title}</h1>
        <button
          type="button"
          onClick={ this.redirectProfile }
        >
          <img
            src={ profileIcon }
            alt="Imagem do perfil"
            data-testid="profile-top-btn"
          />
        </button>
        {
          searchBtn && (
            <button type="button" onClick={ this.handleClick }>
              <img
                src={ searchIcon }
                alt="Imagem do perfil"
                data-testid="search-top-btn"
              />
            </button>
          )
        }
        {renderSearchInput && <SearchBar />}
      </header>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}.isRequired;

export default connect()(Header);
