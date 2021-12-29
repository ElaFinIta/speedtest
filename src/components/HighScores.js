import React, { useEffect, useState } from 'react';
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";


const HighScores = (props) => {
    const [highScores, setHighScores] = useState([]);

    function Message() {
        getScoresFromDB();
        return <h1>All times highest scores</h1>;
    }

    const closeOnEscapeKeyDown = (e) => {
        if ((e.charCode || e.keyCode ) === 27 ) {
            props.close();
        }
    }

    useEffect(() => {
        document.body.addEventListener('keydown', closeOnEscapeKeyDown);
        getScoresFromDB();
    }, [])

    const getScoresFromDB = async () => {
        const data = await getDocs(collection(db, "speedgame"));
        setHighScores(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

    const highestScores = highScores.sort((a, b) => b.score - a.score).slice(0, 3).map((entry) => (
        <li className="score" key={entry.id}>{`${entry.score} ${entry.player} ${entry.date.toDate().toLocaleDateString()}`}</li>
    ))


      return (
        // close on clicking outside popup
        <div className="overlay" onClick={props.close}> 
            {/* stop propagatin closing on clicking */}
            <div className="popup" onClick={e => e.stopPropagation()}>
                <button className="close" onClick={props.close}>X</button>
                <p>Your score was: {props.score}</p>
                <Message />
                <div className="highScores">
                    {/* <p className="rank">Rank</p>
                    <p className="player">Player</p>
                    <p className="score">Score</p>
                    <p className="date">Date</p> */}
                    {highestScores}
                </div>
            </div>
        </div>
    );
};

export default HighScores;