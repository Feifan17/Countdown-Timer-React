import React from "react";
import Button from "../UI/Button/Button";

function Controls(props) {
  return (
    <div>
      <Button
        click={() => props.setSpeed(1)}
        btnType="speed"
        active={props.speed === 1 ? true : false}
      >
        1X
      </Button>
      <Button
        click={() => props.setSpeed(1.5)}
        btnType="speed"
        active={props.speed === 1.5 ? true : false}
      >
        1.5X
      </Button>
      <Button
        click={() => props.setSpeed(2)}
        btnType="speed"
        active={props.speed === 2 ? true : false}
      >
        2X
      </Button>
    </div>
  );
}

export default Controls;
