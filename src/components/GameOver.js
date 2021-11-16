import React from 'react';

const GameOver = (props) => {

    function Message() {
        const scored = props.score;
        if (scored > 12) {
            return <p>Woooah, you're a pro rainbow feeder!</p>;
        } else if (scored > 6) {
            return <p>More rainbows, please!</p>;
        } else {
            return <p>We need some rainbows here!</p>;
        }
    }


    return (
        <div className="overlay">
            <div className="popup">
                <button className="close" onClick={props.close}>X</button>
                <h1>Game over</h1>
                <p>Your score was: {props.score}</p>
                <Message />
                <p className="rainbowField">
                    {/* i is a unique key for each list element */}
                    {[...Array(props.score)].map((e,i) => <span className="rainbow" key={i}>🌈</span>)}
                </p>
            </div>
        </div>
    );
};

export default GameOver;