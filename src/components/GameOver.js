import React from 'react';


const closeHandler = () => {
    window.location.reload();
};

const GameOver = (props) => {
    return (
        <div className="overlay">
            <div className="popup">
                <button className="close" onClick={closeHandler}>X</button>
                <h1>Game over</h1>
                <p>Your score was: {props.score}</p>
            </div>
        </div>
    );
};

export default GameOver;