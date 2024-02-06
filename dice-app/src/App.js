import React from "react";
import { nanoid } from 'nanoid'
import './App.css';
import DiceComponent from "./components/SingleDice.js";
import casinoDice from "../src/images/casino-dice.png"

function App() {

  const [ArrayDices, setArrayDices] = React.useState(allNewDice());
  const [game, setGame] = React.useState(false)

  React.useEffect(() => {
    const allHeld = ArrayDices.every(dice => dice.isHeld)
    const firstValue = ArrayDices[0].value
    const allSameValue = ArrayDices.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setGame(true)
    }
  }, [ArrayDices])


  function allNewDice() {
    const DiceArray = [];
    for (let i = 0; i < 10; i++) {
      DiceArray.push(generateSingleDice());

    }
    return DiceArray;
  }

  function generateSingleDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function rollDices() {
    if(!game){
      setArrayDices(oldDice => {
        return oldDice.map(dice => {
          return dice.isHeld ? dice : generateSingleDice()
        })
      })
    } else {
      setGame(false)
      setArrayDices(allNewDice())
    }

  }

  function hold(id) {
    setArrayDices(oldDice => oldDice.map(dice => {
      return dice.id === id ? { ...dice, isHeld: !dice.isHeld } :
        dice
    }))
  }

  const DiceEls = ArrayDices.map(dice => {
    return <DiceComponent
      hold={() => hold(dice.id)}
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
    />
  })




  return (
    <main className="App">
      <div className="container">
      <p className="description">Roll until all dice<span><img className="dice-picture" src={casinoDice} alt="smallDice"/></span> are the same number. You can click each one to freeze the number inside.</p>
        <div className="main--box">
          {DiceEls}
        </div>
        <div className="button--wrapper">
          <button className="roll--button" onClick={rollDices}>{game ? "New Game" : "Roll the Dice"}</button>
        </div>
      </div>

    </main>
  );
}

export default App;
