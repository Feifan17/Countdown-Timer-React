import React from "react";
// Components.
import Controls from "../Controls/Controls";
import Button from "../UI/Button/Button";
import Message from "../UI/Message/Message";
// CSS.
import classes from "./Timer.module.css";

function Timer(props) {
  const timeLeft = props.minutes * 60 + props.seconds;
  let button = null;
  if (props.timerId && props.ticking) {
    button = (
      <Button click={props.stop} btnType="stop">
        Stop
      </Button>
    );
  }
  if (props.timerId && !props.ticking) {
    button = (
      <Button click={props.resume} btnType="resume">
        Resume
      </Button>
    );
  }
  const textStyles = [];
  textStyles.push(classes.timer);
  if (timeLeft <= 20 && timeLeft > 0) {
    textStyles.push(classes.warn);
  }
  if (timeLeft < 10 && timeLeft > 0) {
    textStyles.push(classes.blink);
  }

  return (
    <div>
      <Message
        minutes={props.minutes}
        seconds={props.seconds}
        ticking={props.ticking}
        totalTime={props.totalTime}
      />
      <p className={textStyles.join(" ")}>
        {props.minutes < 10 ? "0" : null}
        {props.minutes}:{props.seconds < 10 ? "0" : null}
        {props.seconds}
      </p>
      {button}
      <Controls setSpeed={props.setSpeed} speed={props.speed}></Controls>
    </div>
  );
}

export default Timer;
