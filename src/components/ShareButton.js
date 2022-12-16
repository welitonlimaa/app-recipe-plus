import React from 'react';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

class ShareButton extends React.Component {
  state = {
    copy: false,
  };

  copylink = () => {
    const url = window.location.href;
    clipboardCopy(url);
    this.setState({ copy: true });
  };

  render() {
    const { copy } = this.state;
    return (
      <div>
        { copy ? <span>Link copied!</span> : ''}
        <button
          type="button"
          onClick={ this.copylink }
        >
          <img
            data-testid="share-btn"
            src={ shareIcon }
            alt="compartilhar"
          />
        </button>
      </div>
    );
  }
}

export default ShareButton;
