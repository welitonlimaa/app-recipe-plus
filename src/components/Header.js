import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
// import profileIcon from '../images/profileIcon.svg';
// import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import logo from '../style/images/logo.png';
import drinkimg from '../style/images/drinkimg.png';
import mealimg from '../style/images/mealimg.png';
import lupa from '../style/images/lupaicon.png';
import perfilicon from '../style/images/perfilicon.png';
import doneimg from '../style/images/doneimg.png';
import perfil from '../style/images/Perfil.png';

class Header extends React.Component {
  state = {
    searchBtn: true,
    title: '',
    renderSearchInput: false,
    imgtitle: '',
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
        imgtitle: mealimg,
      });
      break;
    case '/drinks':
      this.setState({
        searchBtn: true,
        title: 'Drinks',
        imgtitle: drinkimg,
      });
      break;
    case '/profile':
      this.setState({
        searchBtn: false,
        title: 'Profile',
        imgtitle: perfil,
      });
      break;
    case '/done-recipes':
      this.setState({
        searchBtn: false,
        title: 'Done Recipes',
        imgtitle: doneimg,
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
  };

  handleClick = () => {
    this.setState((oldState) => ({ renderSearchInput: !oldState.renderSearchInput }));
  };

  render() {
    const { searchBtn, title, renderSearchInput, imgtitle } = this.state;
    return (
      <header className="navbar d-flex flex-column">
        <div className="d-flex sub-header">
          <div className="p-2 flex-grow-1">
            <img
              src={ logo }
              alt="logo"
            />
          </div>
          <button
            className="p-2"
            type="button"
            onClick={ this.redirectProfile }
          >
            <img
              src={ perfilicon }
              alt="Imagem do perfil"
              data-testid="profile-top-btn"
            />
          </button>
          {
            searchBtn && (
              <button type="button" onClick={ this.handleClick } className="p-2">
                <img
                  src={ lupa }
                  alt="Imagem do perfil"
                  data-testid="search-top-btn"
                />
              </button>
            )
          }
        </div>
        <div className="header-title text-center p-4">
          <img
            src={ imgtitle }
            alt="title-img"
          />
          <h1 data-testid="page-title">{title}</h1>
        </div>
        <div>
          {renderSearchInput && <SearchBar />}
        </div>
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
