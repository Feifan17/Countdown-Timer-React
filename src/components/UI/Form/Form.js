import React from "react";
// CSS.
import classes from "./Form.module.css";

function Form(props) {
  let error = null;
  if (props.error) {
    error = <p className={classes.error}>Input is invalid.</p>;
  }
  return (
    <form
      onSubmit={props.timerId ? props.reset : props.start}
      className={classes.inputForm}
    >
      {error}
      <label>Countdown: </label>
      <input
        type="text"
        placeholder="# of minutes (1-99)"
        value={props.inputMinutes}
        onChange={props.inputChangeHandler}
        disabled={props.timerId}
      />
      <input
        type="submit"
        value={props.timerId ? "Reset" : "Start"}
        disabled={!props.touched || props.error}
      />
    </form>
  );
}

export default Form;
