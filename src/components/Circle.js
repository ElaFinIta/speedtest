import React from 'react';
import './Circle.css';

const Circle = (props) => {
    return (
        // <div className={`circle ${props.color}`}>
        <div
        style={{
            backgroundColor: props.color,
            pointerEvents: props.disabled ? "auto" : "none"
        }}

        // if the props.active is true, then add "active" otherwise add empty string/nothing
        className={`circle ${props.active ? "active" : ""}`}
        onClick={props.click}>
        </div>
    );
};

export default Circle;