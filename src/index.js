import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const arr = ['some', 'new', 'data'];

  const newArr = arr.map(formatArray);

  function formatArray(el) {
    return el + ' some ';
  }

  return <h1>{newArr}</h1>;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
