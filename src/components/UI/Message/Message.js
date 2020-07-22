import React from "react";
// CSS.
import classes from "./Message.module.css";

function Message(props) {
  let message = null;
  const timeLeft = props.minutes * 60 + props.seconds;
  if (props.ticking && timeLeft < props.totalTime / 2 && timeLeft > 0) {
    message = <p className={classes.message}>More than halfway there!</p>;
  } else if (props.ticking && timeLeft === 0) {
    message = <p className={classes.message}>Time's up!</p>;
  }
  return message;
}

export default Message;
