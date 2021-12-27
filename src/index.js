import React from 'react';
import ReactDOM from 'react-dom';
import { compose, pipe } from 'lodash/fp';

const App = () => {
  const x = 2;

  const double = number => number * 2;
  const square = number => number * number;
  const half = number => number / 2;

  const mathCalculate = pipe(double, square, half);

  return <h1>{mathCalculate(x)}</h1>;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
