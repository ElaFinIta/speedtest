import React, { Component } from 'react';
import Circle from './components/Circle';
import { circles } from "./components/circles";
import GameOver from './components/GameOver';
import startSound from "./assets/sounds/startSound.mp3";
import gameOver from "./assets/sounds/gameOver.mp3";
import clickSound from "./assets/sounds/clickSound.mp3";

let gameStartSound = new Audio(startSound);
let gameOverSound= new Audio(gameOver);
let clickCircleSound= new Audio(clickSound);

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};


class App extends Component {
  state = {
    score: 0,
    current: 0,
    showGameOver: false,
    pace: 1500,
    emptyRounds: 0,
    gameStarted: false
  };

  timer = undefined;

  nextCircle = () => {
    if (this.state.emptyRounds >=5) {
      this.stopHandler();
      return;
    }
    let nextActive;

    do {
      nextActive = getRndInteger(1, 4)
    } while (nextActive === this.state.current);  // until nextActive is the same as the current----> find a new number

    this.setState({
      current: nextActive,
      pace: this.state.pace*0.95,  // speed gets faster at every right click
      emptyRounds: this.state.emptyRounds+1
    });

    this.timer = setTimeout(this.nextCircle, this.state.pace);
    console.log(this.state.current);
  };

  clickHandler = (id) => {
    // console.log("You clicked:", id);
    if (this.state.current !== id) {
      this.stopHandler();
      return;  // we need this not to go further in the function
    }
    clickCircleSound.pause();
    clickCircleSound.play();
    this.setState({
      score: this.state.score + 1,
      emptyRounds: 0
    }) 
  };

  startHandler = () => {
    gameStartSound.play();
    this.nextCircle();
    this.setState({
      gameStarted: true
    })
  };

  stopHandler = () => {
    gameStartSound.pause();
    gameOverSound.play();
    clearTimeout(this.timer);

    this.setState({
      showGameOver: true,
      current: 0,
      emptyRounds: 0,
      gameStarted: false
    }) 
  };

  closeHandler = () => {
    this.setState({
      showGameOver: false,
      score: 0,
      pace: 1500
    }) 
  }

  render() {
    return (
      <div>
        <h1>Speedtest game</h1>
        <p>Your score is: {this.state.score}</p>
        <div className="circles">
          {circles.map(c => <Circle
            key={c.id}
            color={c.color}
            id={c.id}
            click={() => this.clickHandler(c.id)}
            active={this.state.current === c.id}
            disabled={this.state.gameStarted}  // true
            
            />)}
        </div>
        <div className="button_wrap">
          <button disabled={this.state.gameStarted} onClick={this.startHandler}>START</button>
          <button onClick={this.stopHandler}>STOP</button>
        </div>
        {this.state.showGameOver && <GameOver score={this.state.score} close={this.closeHandler}/>}
      </div>
    );
  }
}

export default App;
