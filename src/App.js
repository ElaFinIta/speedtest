import React, { Component } from 'react';
import Circle from './components/Circle';
import { circles } from "./components/circles";
import GameOver from './components/GameOver';


const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};


class App extends Component {
  state = {
    score: 0,
    current: 0,
    showGameOver: false
  };

  timer = undefined;
  pace = 1500;

  nextCircle = () => {
    let nextActive;

    do {
      nextActive = getRndInteger(1, 4)
    } while (nextActive === this.state.current);  // until nextActive is the same as the current----> find a new number

    this.setState({
      current: nextActive,
    });

    this.pace *= 0.95;  // speed gets faster at every right click
    this.timer = setTimeout(this.nextCircle, this.pace);
    console.log(this.state.current);
  };

  clickHandler = () => {
    this.setState({
      score: this.state.score + 10
    });
  };

  startHandler = () => {
    this.nextCircle();
  };

  stopHandler = () => {
    clearTimeout(this.timer);

    this.setState({
      showGameOver: true
    }) 
  };

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
            click={this.clickHandler}
            active={this.state.current === c.id}
            
            />)}
        </div>
        <div className="button_wrap">
          <button onClick={this.startHandler}>START</button>
          <button onClick={this.stopHandler}>STOP</button>
        </div>
        {this.state.showGameOver && <GameOver score={this.state.score}/>}
      </div>
    );
  }
}

export default App;
