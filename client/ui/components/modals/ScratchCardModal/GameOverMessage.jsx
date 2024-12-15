import React from 'react';
import {H2} from "../../heading/Headings";

const GameOverMessage = ({message}) => (
  <div className="scratch-card-wait-to-play">
    <H2 text={message}/>
  </div>
);

export default GameOverMessage;
