import React from 'react';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import whiteHeartIcon from '../style/images/like.png';

class FavButton extends React.Component {
  render() {
    return (
      <button type="button">
        <img
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
          alt="favortitar"
        />
      </button>
    );
  }
}

export default FavButton;
