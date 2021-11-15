import './App.css';
import React, { Component } from 'react';
import Circle from './components/Circle';
import { circles } from "./components/circles";

class App extends Component {
  state = {};

  render() {
    return (
      <div>
        <h1>Speedtest game</h1>
        <p>Your score is:</p>
        <div className="circles">
          {circles.map(c => <Circle key={c.id} color={c.color} id={c.id}/>)}
        </div>
        <div className="button_wrap">
          <button>START</button>
          <button>STOP</button>
        </div>
      </div>
    );
  }
}

export default App;
