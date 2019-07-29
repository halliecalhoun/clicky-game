import React from "react";
import "./style.css";

function FriendCard(props) {
  return (
    <div className="card">
      <div className="img-container">
        <img alt={props.name} src={props.image} />
     
      
      <div onClick={() => props.setClicked(props.id)} className="card col-md-3">
        <img alt={props.name} src={props.image} />
      </div>
    </div>
    </div>
  );
}

export default FriendCard;
