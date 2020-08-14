/* eslint-disable jsx-a11y/heading-has-content */
import React from "react";

function InfoCard(props) {
  return (
    <div className="card" onClick={() => props.handleClick(props.type)}>
      <h1
        style={{
          display: props.type === props.selected ? "block" : "none",
          background:
            props.type === "cases"
              ? "red"
              : props.type === "recovered"
              ? "greenyellow"
              : "gray",
        }}
        className="card-color"
      ></h1>
      <h5>{props.title}</h5>
      <h1
        style={{
          color:
            props.type === "cases"
              ? "red"
              : props.type === "recovered"
              ? "greenyellow"
              : "gray",
        }}
      >
        {props.today}
      </h1>
      <p>{props.total} Total</p>
    </div>
  );
}

export default InfoCard;
