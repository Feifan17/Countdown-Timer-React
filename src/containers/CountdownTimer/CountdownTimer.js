import React, { Component } from "react";
// Components.
import Timer from "../../components/Timer/Timer";
import Form from "../../components/UI/Form/Form";
// CSS.
import classes from "./CountdownTimer.module.css";

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMinutes: "",
      totalTime: 0,
      currentMinutes: 0,
      currentSeconds: 0,
      speedLevel: 1,
      timerId: null,
      ticking: false,
      error: false,
      touched: false
    };
  }

  // Start timer.
  startTimer = event => {
    event.preventDefault();
    if (!this.state.touched || this.state.error) {
      return;
    }
    clearInterval(this.state.timerId);
    // Update minutes and seconds every second.
    this.setState(
      {
        ...this.state,
        totalTime: this.state.inputMinutes * 60,
        currentMinutes: this.state.inputMinutes,
        currentSeconds: 0
      },
      () => {
        const timerId = setInterval(() => {
          let timeLeft =
            this.state.currentMinutes * 60 + this.state.currentSeconds;
          // Clear timer once finished.
          if (timeLeft === 0) {
            clearInterval(this.state.timerId);
          } else {
            timeLeft = timeLeft - 1;
            const updatedMinutes = Math.floor(timeLeft / 60);
            const updatedSeconds = timeLeft % 60;
            this.setState({
              ...this.state,
              currentMinutes: updatedMinutes,
              currentSeconds: updatedSeconds
            });
          }
        }, 1000 / this.state.speedLevel);
        // Update timerId and ticking once timer started.
        this.setState({
          ...this.state,
          timerId: timerId,
          ticking: true,
          inputMinutes: ""
        });
      }
    );
  };

  // Reset Timer.
  resetTimer = event => {
    event.preventDefault();
    clearInterval(this.state.timerId);
    this.setState({
      inputMinutes: "",
      totalTime: 0,
      currentMinutes: 0,
      currentSeconds: 0,
      speedLevel: 1,
      timerId: null,
      ticking: false,
      error: false,
      touched: false
    });
  };

  // Stop timer.
  stopTimer = () => {
    clearInterval(this.state.timerId);
    this.setState({
      ...this.state,
      ticking: false
    });
  };

  // Resume timer.
  resumeTimer = () => {
    const timerId = setInterval(() => {
      let timeLeft = this.state.currentMinutes * 60 + this.state.currentSeconds;
      // Clear timer once finished.
      if (timeLeft === 0) {
        clearInterval(this.state.timerId);
      } else {
        timeLeft = timeLeft - 1;
        const updatedMinutes = Math.floor(timeLeft / 60);
        const updatedSeconds = timeLeft % 60;
        this.setState({
          ...this.state,
          currentMinutes: updatedMinutes,
          currentSeconds: updatedSeconds
        });
      }
    }, 1000 / this.state.speedLevel);
    // Update timerId and ticking once timer started.
    this.setState({
      ...this.state,
      timerId: timerId,
      ticking: true
    });
  };

  // Change speed.
  setSpeedLevel = speedLevel => {
    if (!this.state.timerId || !this.state.ticking) {
      this.setState({
        ...this.state,
        speedLevel: speedLevel
      });
    } else {
      clearInterval(this.state.timerId);
      this.setState(
        {
          ...this.state,
          speedLevel: speedLevel
        },
        this.resumeTimer
      );
    }
  };

  // Handle user input.
  inputChangeHandler = event => {
    const val = parseInt(event.target.value, 10);
    // In order to follow the time format "MM:SS",
    // # of minutes should between 1 and 99 (inclusively).
    if (!Number.isInteger(val) || val < 1 || val > 99) {
      this.setState({
        ...this.state,
        error: true,
        touched: true,
        inputMinutes: event.target.value
      });
    } else {
      this.setState({
        ...this.state,
        error: false,
        touched: true,
        inputMinutes: val
      });
    }
  };

  render() {
    return (
      <div className={classes.container}>
        <Form
          inputChangeHandler={this.inputChangeHandler}
          ticking={this.state.ticking}
          reset={this.resetTimer}
          start={this.startTimer}
          error={this.state.error}
          touched={this.state.touched}
          inputMinutes={this.state.inputMinutes}
          timerId={this.state.timerId}
        ></Form>
        <Timer
          totalTime={this.state.totalTime}
          timerId={this.state.timerId}
          minutes={this.state.currentMinutes}
          seconds={this.state.currentSeconds}
          ticking={this.state.ticking}
          setSpeed={this.setSpeedLevel}
          stop={this.stopTimer}
          resume={this.resumeTimer}
          speed={this.state.speedLevel}
        ></Timer>
      </div>
    );
  }
}

export default CountdownTimer;
