import React from 'react';
// import shareIcon from '../images/shareIcon.svg';
import shareIcon from '../style/images/Share.png';

class ShareButton extends React.Component {
  render() {
    return (
      <button type="button" id="btn-share">
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
