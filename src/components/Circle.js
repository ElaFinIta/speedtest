import React from 'react';
import './Circle.css';

const Circle = (props) => {
    return (
        // <div className={`circle ${props.color}`}>
        <div style={{backgroundColor: props.color}}
        className="circle">
            <p>{props.id}</p>
        </div>
    );
};

export default Circle;