import './App.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { red, green } from 'ansi-colors';


// Parse the string operations to get the result
const resultOperation = (operations) => {
  const [num1, operator, num2] = operations.split(' ');

  // Conversion of numbers to integer
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  // Resolution of the operations
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
  const [operations, setOperations] = useState("");
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [listQuestions, setListQuestions] = useState([]);
  const [listResponses, setListResponses] = useState([]);
  const [Details, setDetails] = useState(false);

  // Function call when we use the touch enter or when we click on the button Valid
  // Comparison between the result of the operation and our response
  const handleSubmit = () => {
    const result = resultOperation(operations);

    // Response that is not an integer
    if (inputValue === '') {
      console.log("Please enter a number");
      setCounter(2);
    }

    // Comparison true
    else if (parseInt(inputValue) === result) {
      setGame(game + 1);
      listResponses.push("Well done! Your answer " + inputValue + " is correct for " + operations);
      setGood(good + 1);
      setCounter(1);
    }
    // Comparison false
    else {
      setGame(game + 1);
      listResponses.push("Your answer " + inputValue + " is wrong for " + operations);
      setCounter(-1);
    }

    // limit of game
    if (game === 9) {
      setIsGameFinished(true);
      setListQuestions([]);
    }

  }

  // Creates a new operations for mode easy after the comparing the old one
  const handleNewOperationEasy = () => {
    const num1 = Math.floor(Math.random() * (10 - 0 + 1)) + 0
    const num2 = Math.floor(Math.random() * (10 - 0 + 1)) + 0
    const op = num1 + " + " + num2 + " = ?";

    // Check if the operations has not already been proposed
    if (listQuestions.includes(op)) {
      console.log("doublon");
      handleNewOperationEasy();
    }
    listQuestions.push(op);
    setOperations(op);
    setInputValue('');
  }

  // Creates a new operations for mode hard after the comparing the old one
  const handleNewOperationHard = () => {
    let num1 = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
    let num2 = Math.floor(Math.random() * (20 - 0 + 1)) + 0;

    const random = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
    let op = '';

    // random number, if random equal to 0 
    // so the operation will be a multiplication
    if (random === 0) {
      op = num1 + " * " + num2 + " = ?";
    }
    // else, the operation will be a soustraction
    else {
      num1 = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
      num2 = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
      op = num1 + " - " + num2 + " = ?";
    }

    // check if the operation has already been proposed 
    if (listQuestions.includes(op)) {
      console.log("doublon");
      handleNewOperationHard();
    }
    listQuestions.push(op);
    setOperations(op);
    setInputValue('');
  }

  // call the specific handle
  const handleNewOperation = () => {
    if (selectedMode === 'easy')
      handleNewOperationEasy();
    else if (selectedMode === 'hard')
      handleNewOperationHard();
  }

  // call the handleNewOperation() after the answer of the old operation
  useEffect(() => {
    if (counter === 1 || counter === -1) {
      setTimeout(() => {
        handleNewOperation();
        setCounter(0);
      }, 600);
    }
    if (counter === 2) {
      setTimeout(() => {
        setCounter(0);
      }, 600);
    }
  }, [counter]);

  // function call when we choose the mode easy
  const handleEasyMode = () => {
    setSelectedMode('easy');
    handleNewOperationEasy();
  };

  // function call when we choose the mode hard
  const handleHardMode = () => {
    setSelectedMode('hard');
    handleNewOperationHard();
  };

  const result = resultOperation(operations);

  return (
    <div className="App">
      <h1>Calculus</h1>
      {!selectedMode && (
        <div className='Mode'>
          <h2>Choose a mode:</h2>
          <button onClick={handleEasyMode}>Easy</button>
          <button onClick={handleHardMode}>Hard</button>
        </div>
      )}
      {selectedMode && game < 10 && (
        <div className="Operation">
          <h2>{operations}</h2>
          <input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <button onClick={handleSubmit}>Valid</button>
          <h5 style={{ color: counter === 1 ? 'green' : 'red' }}>
            {
              counter === 1 ?
                'TRUE' : counter === -1 ?
                  result : counter === 2 ? "Please enter a number" : ""}
          </h5>
        </div>
      )}
      {!Details && isGameFinished && (
        <div className='Result'>
          <h2>Good answers: {good}</h2>
          <h2>Bad answers: {game - good}</h2>
          <button onClick={() => {
            setIsGameFinished(false);
            setGame(0);
            setGood(0);
            setSelectedMode('');
            handleNewOperation();
          }}>Rejouer</button>

          <button onClick={() => {
            setDetails(true);
          }}>Details</button>
        </div>
      )}
      {Details && (
        <div className='Details'>
          <h6>
            {listResponses.map((item, index) => (
              <p key={index + "baba"}>{item}</p>
            ))}
          </h6>
          <button onClick={() => {
            setIsGameFinished(false);
            setGame(0);
            setGood(0);
            setSelectedMode('');
            handleNewOperation();
            setDetails(false);
            setListResponses([]);
          }}>Rejouer</button>

        </div>
      )}

    </div>
  );
}

export default App;