import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

class Header extends React.Component {
  render() {
    return (
      <header>
        <button
          type="button"
        >
          <img
            src={ profileIcon }
            alt="Imagem do perfil"
            data-testid="profile-top-btn"
          />
        </button>
        <button type="button">
          <img
            src={ searchIcon }
            alt="Imagem do perfil"
            data-testid="search-top-btn"
          />
        </button>
        <h1 data-testid="page-title">Ola mundo</h1>
      </header>
    );
  }
}

export default Header;
