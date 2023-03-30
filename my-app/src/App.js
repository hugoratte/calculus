import './App.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { red, green } from 'ansi-colors';

const Counter = (good) => {
  return (
    good + 1
  );
}

const resultOperation = (operations) => {
  const [num1, operator, num2] = operations.split(' ');

  // Conversion des nombres en type numérique
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  // Résolution de l'opération en fonction de l'opérateur
  switch (operator) {
    case '+':
      return n1 + n2;
    case '-':
      return n1 - n2;
    case '*':
      return n1 * n2;
    case '/':
      return n1 / n2;
    default:
      return NaN;
  }
};

const App = () => {
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [good, setGood] = useState(0);
  const [game, setGame] = useState(0);
  const [selectedMode, setSelectedMode] = useState(null);
  const [operations, setOperations] = useState("5 * 5 = ?");
  const [isGameFinished, setIsGameFinished] = useState(false);


  const Response = async (result) => {
    const response = await fetch('https://api.github.com/users');
    const data = await response.json();
    console.log(data);
  }


  const handleSubmit = () => {
    setGame(game + 1);
    const result = resultOperation(operations);
    if (parseInt(inputValue) === result) {
      setGood(good + 1);
      setCounter(1);
    } else {
      setCounter(-1);
    }
    if (game === 9)
    {
      setIsGameFinished(true);
    }

  }

  const handleNewOperation = () => {
    const num1 = Math.floor(Math.random() * (10 - 0 + 1)) + 0
    const num2 = Math.floor(Math.random() * (10 - 0 + 1)) + 0
    const op = num1 + " + " + num2 + " = ?";
    setOperations(op);
    setInputValue('');
  }

  useEffect(() => {
    if (counter === 1 || counter === -1) {
      setTimeout(() => {
        handleNewOperation();
        setCounter(0);
      }, 600);
    }
  }, [counter]);

  const handleEasyMode = () => {
    setSelectedMode('easy');
  };

  const handleHardMode = () => {
    setSelectedMode('hard');
  };

  const result = resultOperation(operations);

  return (
    <div className="App">
      <h1>Calculus</h1>
      {!selectedMode && (
        <div>
          <h2>Choose a mode:</h2>
          <button onClick={handleEasyMode}>Easy</button>
          <button onClick={handleHardMode}>Hard</button>
        </div>
      )}
      {selectedMode && game < 10 && (
        <div className="Operation">
          <h1>{operations}</h1>
          <input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} 
          />
          <button onClick={handleSubmit}>Valid</button>
          <h4 style={{ color: counter === 1 ? 'green' : 'red' }}>
            {counter === 1 ? 'TRUE' : counter === -1 ? result : ""}
          </h4>
        </div>
      )}
      {isGameFinished && (
        <div className='Result'>
          <h3>Good answers: {good}</h3>
          <h3>Bad answers: {game - good}</h3>
          <button onClick={() => {
            setIsGameFinished(false);
            setGame(0);
            setGood(0);
            handleNewOperation();
          }}>Rejouer</button>
        </div>
      )}
    </div>
  );
}

export default App;