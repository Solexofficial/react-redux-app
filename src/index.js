import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  function someFn() {
    return function () {
      return 'app';
    };
  }

  const fn = someFn();

  return <h1>{fn()}</h1>;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
