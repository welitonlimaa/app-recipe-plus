import loadingimg from '../style/images/loadingimg.png';

function Loading() {
  return (
    <img
      className="position-absolute top-50 start-50 translate-middle"
      src={ loadingimg }
      alt="loading..."
    />
  );
}

export default Loading;
