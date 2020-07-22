import React from "react";
import classes from "./Button.module.css";

function Button(props) {
  const btnStyles = [];
  btnStyles.push(classes.button);
  switch (props.btnType) {
    case "speed":
      if (props.active) {
        btnStyles.push(classes.btnActive);
      } else {
        btnStyles.push(classes.btnSpeed);
      }

      break;
    case "stop":
      btnStyles.push(classes.btnStop);
      break;
    default:
      btnStyles.push(classes.btnDefault);
      break;
  }
  return (
    <button className={btnStyles.join(" ")} onClick={props.click}>
      {props.children}
    </button>
  );
}

export default Button;
