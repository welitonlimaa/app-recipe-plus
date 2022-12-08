import React from 'react';
import shareIcon from '../images/shareIcon.svg';

class ShareButton extends React.Component {
  render() {
    return (
      <button type="button">
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="compartilhar"
        />
      </button>
    );
  }
}

export default ShareButton;
