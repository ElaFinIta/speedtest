import React, { useEffect, useState} from 'react';
import { db } from "../firebase.js";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";


const GameOver = (props) => {
    const [player, setPlayer] = useState("");

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

    const closeOnEscapeKeyDown = (e) => {
        if ((e.charCode || e.keyCode ) === 27 ) {
            props.close();
        }
    }

    useEffect(() => {
        document.body.addEventListener('keydown', closeOnEscapeKeyDown)
    }, [])


    const scoreHandler = (e) => {
        e.preventDefault();
        addScoreToDB();
        props.close();
    }

    const addScoreToDB = async () => {
        await addDoc(collection(db, "speedgame"), {
          player: player,
          score: props.score, 
          date: Timestamp.fromDate(new Date()),
        });
    };

    const nickHandler = e => setPlayer(e.target.value);

    
      return (
        // close on clicking outside popup
        <div className="overlay" onClick={props.close}> 
            {/* stop propagatin closing on clicking */}
            <div className="popup" onClick={e => e.stopPropagation()}>
                <button className="close" onClick={props.close}>X</button>
                <h1>Game over</h1>
                <p>Your score was: {props.score}</p>
                <div className="input_button">
                    <input type="text" className="player" placeholder="Nickname" required onChange={nickHandler}/>
                    <button className="score_button" onClick={scoreHandler}>SAVE</button>
                </div>
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